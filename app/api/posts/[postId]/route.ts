
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
//import { redirect } from "next/navigation";
import { useRouter } from "next/navigation"

interface Params {
    params: {
        postId: string;
    }
}

  
// PUT /api/posts/:postId/publish
export async function PUT(request: Request, { params }: Params) {
    const postId = Number(params.postId);
    await prisma.post.update({
        where: { id: postId },
        data: { published: true },
    })
    console.log(`This is the PUT request`)
    console.log(postId)
    return new Response("success", { status: 200 })
    
     
    redirect('/posts')

} 
// DELETE /api/posts/:postId
export async function DELETE(request: Request, { params }: Params) {
    const postId = Number(params.postId);
    try {
        await prisma.post.delete({
            where: { id: postId },
        })
    }
    catch (error) {
        console.log(error)
    }
     
     return new Response("success", { status: 200 })
    redirect('/posts')
}