import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }
        const user=await User.findOne({email});
        if(!user || user.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const validPassword=await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const isVerified = user.isVerified;
        if (!isVerified) {
            return NextResponse.json({ error: "Email not verified" }, { status: 403 });
        }

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
        });
        
        return response;

    } catch (error) {
        console.error("Error during sign-in:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}