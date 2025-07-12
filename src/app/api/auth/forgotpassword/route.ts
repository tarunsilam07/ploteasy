import { NextRequest,NextResponse } from "next/server";
import {connectDb} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import sendEmail from "@/helpers/mailer";
connectDb();

export async function POST(request: NextRequest) {
   try {
    const reqBody=await request.json();
    const{email}=reqBody;
    console.log(email);
    const user=await User.findOne({email});
    if(!user){
        return NextResponse.json({error:"User not found"},{status:404});
    }

    await sendEmail({email,emailType:"RESET",userId:user._id});
    return NextResponse.json({message:"Email sent to reset password"});

   } catch (error) {
        return NextResponse.json({error:error},{status:500});
   }
}