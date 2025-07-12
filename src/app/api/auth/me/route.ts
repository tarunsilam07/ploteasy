import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connectDb } from "@/dbConfig/dbConfig";
connectDb();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const lastCompleted = user.lastCompletedDate
      ? new Date(user.lastCompletedDate)
      : null;

    // ❌ If the last completed date is before yesterday, reset streak
    if (lastCompleted && lastCompleted < yesterday) {
      user.streak = 0;
      await user.save();
    }

    return NextResponse.json({
      message: "User Found",
      user: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
