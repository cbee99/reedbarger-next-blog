import PostDetails from "@/app/components/PostDetails";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: {
        postId: string;
    }
}


export default async function PostPage({ params }: Props) {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params.postId)
        },
        include: {
            author: true,
            //createdAt: true,
        },
    })
    if (!post) {
        notFound()
    }
    return <PostDetails {...post}/>
}