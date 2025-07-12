import { NextRequest, NextResponse } from "next/server";
import {connectDb} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();
    console.log("Received body:", body)
    const {_id,username, email, profileImageURL } = body;
    const password=_id;

    let user = await User.findOne({ email });
    if (!user) {
      try {
        user = await User.create({ username, email, profileImageURL,password,isVerified: true });
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
    console.log("User saved:", user);


    const tokenData={
                id:user._id,
                username:user.username,
                email:user.email,
                level:user.level,
                isAdmin:user.isAdmin
            }
    
            const token=jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });
    
            const response =NextResponse.json({
                user,
                message: "Login successful",
                success:true,
            });
    
            response.cookies.set("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            
            return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
