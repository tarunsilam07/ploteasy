import { NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import Property from "@/models/propertyModel";

export const GET = async () => {
  try {
    await connectDb();

    const listings = await Property.find({ isPremium: true })
      .sort({ createdAt: -1 })
      .limit(15)
      .lean();

    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    return NextResponse.json({ message: "Failed to fetch listings" }, { status: 500 });
  }
};
