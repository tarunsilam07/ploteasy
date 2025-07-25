import { NextResponse } from "next/server";
import {connectDb} from '@/dbConfig/dbConfig'
import Blog from "@/models/blogModel";
connectDb();

export async function GET(){
    try {
        const blogs=await Blog.find({});
        return NextResponse.json({message:"Blogs fectched successfully",success:true,blogs},{status:200});
    } catch (error:any) {
        return NextResponse.json({error:error.message,success:false},{status:500});
    }
}