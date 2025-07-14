import { NextResponse,NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import User from "@/models/userModel";
import {connectDb} from '@/dbConfig/dbConfig'
import { getDataFromToken } from "@/helpers/getDataFromToken";
connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const userId = getDataFromToken(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { image } = await req.json();

    if (!image || !image.startsWith("data:image/")) {
      return NextResponse.json(
        { success: false, error: "Invalid or unsupported file format." },
        { status: 400 }
      );
    }

    console.log("Uploading image to Cloudinary...");
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "uploads",
    });
        await User.findOneAndUpdate(
        { _id: userId }, 
        { profileImageURL: uploadResponse.secure_url }, 
        { new: true } 
      );
      

    return NextResponse.json({
      success: true,
      secure_url: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
