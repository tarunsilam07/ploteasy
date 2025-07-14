import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import Property from "@/models/propertyModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    const data = await req.json();

    const userId = await getDataFromToken(req);
    console.log("User ID from token:", userId);

    const {
      username,
      contact,
      address,
      title,
      type, // 'land' or 'building'
      saleType,
      landCategory,
      floors, // New field
      bedrooms,
      bathrooms,
      propertyAge,
      furnishing,
      facing,
      otherDetails,
      description,
      area,
      price,
      discount, // New field
      parking, // New field
      location,
      images,
      isPremium,
    } = data;
    
    // Perform server-side validation
    if (
      !title ||
      !username ||
      !contact ||
      !address ||
      !type ||
      !saleType || // saleType is now always required
      !area ||
      !price ||
      !location ||
      isPremium === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required." },
        { status: 400 }
      );
    }

    // Conditional validation for property-specific fields
    if (type === 'land' && !landCategory) {
      return NextResponse.json({ success: false, message: "Missing land category." }, { status: 400 });
    }

    const newProperty = new Property({
      username,
      contact,
      address,
      title,
      type,
      transactionType: saleType, // Now included for all property types
      area,
      price,
      location,
      images,
      isPremium,
      description,
      createdBy: userId,
      
      // Conditionally add other fields
      ...(type === 'building' && {
        floors: floors || undefined, // New field
        parking: parking || undefined, // New field
        discount: discount || undefined, // New field
        bedrooms: bedrooms || undefined,
        bathrooms: bathrooms || undefined,
        propertyAge: propertyAge || undefined,
        furnishing: furnishing || undefined,
        otherDetails: otherDetails || undefined,
      }),
      ...(type === 'land' && {
        landCategory,
      }),
      
      // Add facing if provided
      ...(facing && facing !== 'Not Specified' && { facing }),
    });

    await newProperty.save();

    console.log("Property saved successfully:", newProperty);

    return NextResponse.json(
      {
        success: true,
        message: "Property submitted successfully!",
        data: newProperty,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving property:", error);

    if (error instanceof Error && (error as any).name === "ValidationError") {
      const messages = Object.values((error as any).errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error. Please try again." },
      { status: 500 }
    );
  }
}