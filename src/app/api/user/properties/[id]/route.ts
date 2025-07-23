// src/app/api/users/properties/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken"; // Make sure this path is correct
import { connectDb } from "@/dbConfig/dbConfig"; // Make sure this path is correct
import Property from "@/models/propertyModel"; // Make sure this path is correct
import { v2 as cloudinary } from "cloudinary";

connectDb();

// Configure Cloudinary (ensure you have CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in your .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to upload image to Cloudinary
async function uploadImageToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    ).end(buffer);
  });
}

// GET method to fetch a single property
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id; // No need for userId check here if this is a public view route

    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ property }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// PUT method to update a property
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const propertyId = params.id;
    const formData = await request.formData();

    // Reconstruct property data from FormData
    const updatedData: { [key: string]: any } = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("location[")) {
        // Handle nested location object
        const locationKey = key.match(/\[(.*?)\]/)?.[1];
        if (locationKey) {
          if (!updatedData.location) updatedData.location = {};
          updatedData.location[locationKey] = value;
        }
      } else if (key === "existingImages[]") {
        if (!updatedData.images) updatedData.images = [];
        updatedData.images.push(value); // Add existing image URLs back
      } else if (key === "newImages") {
        // Skip newImages for now, handle separately after extracting other data
      } else {
        // Convert numbers and booleans if necessary
        if (["price", "discount", "floors", "parking", "area"].includes(key)) {
          updatedData[key] = parseFloat(value as string);
        } else if (key === "isPremium") {
          updatedData[key] = value === "true"; // FormData boolean values come as strings
        } else if (value === "undefined" || value === "null") {
          // Handle cases where a field might be sent as undefined/null string
          updatedData[key] = undefined;
        }
         else {
          updatedData[key] = value;
        }
      }
    }

    // --- Image Handling ---
    const newImageFiles = formData.getAll("newImages") as File[];
    const uploadedImageUrls: string[] = [];

    // Upload new images
    for (const file of newImageFiles) {
      if (file.size > 0) { // Check if a file was actually uploaded (not an empty file input)
        const imageUrl = await uploadImageToCloudinary(file);
        uploadedImageUrls.push(imageUrl);
      }
    }

    // Combine existing images (if any were kept) with newly uploaded images
    const finalImages = [...(updatedData.images || []), ...uploadedImageUrls];
    updatedData.images = finalImages;

    // Check if at least one image is present
    if (finalImages.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required for the property." },
        { status: 400 }
      );
    }

    // Find and update the property, ensuring the user owns it
    const property = await Property.findOneAndUpdate(
      { _id: propertyId, createdBy: userId },
      { $set: updatedData }, // Use $set to update specific fields
      { new: true, runValidators: true } // Return the updated document and run Mongoose validators
    );

    if (!property) {
      return NextResponse.json(
        { error: "Property not found or not authorized to update" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Property updated successfully", property },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating property:", error);
    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors: { [key: string]: string } = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return NextResponse.json(
        { error: "Validation Error", details: errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE method to delete a property (kept from previous example)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const propertyId = params.id;

    const property = await Property.findOne({
      _id: propertyId,
      createdBy: userId,
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found or not authorized to delete" },
        { status: 404 }
      );
    }

    await Property.deleteOne({ _id: propertyId });

    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}