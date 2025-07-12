import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface user{
    id:string,
    username:string,
    email:string,
    level:string,
    isAdmin:boolean
}

export function getDataFromToken(request:NextRequest){
    try {
        const token=request.cookies.get('token')?.value || "";
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        // Type guard to ensure decoded is of type 'user'
        if (typeof decoded === "string" || !decoded) {
            throw new Error("Invalid token payload");
        }

        const user = decoded as user;
        return user.id;
    } catch (error) {
        throw error
    }
}