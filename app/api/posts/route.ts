import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";
 

//GET /api/posts
export async function GET(request: Request) {
    prisma
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        include: {
            author: true,
        },
    })
    console.log('This is the GET request')
    console.log(posts)

    return NextResponse.json(posts);
}
    
 