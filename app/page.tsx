import prisma from "@/lib/prisma";
import Post from "./components/Post";
import { revalidatePath } from "next/cache";
export const revalidate = 0;
export const dynamic = "force-dynamic";
 

export default async function HomePage() {
  const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        include: {
            author: true,
        },
    })
    console.log()
  revalidatePath('/')
  return (
     <main>
        <h1>Latest Posts</h1>
         {posts.map(post => (
           <Post key={post.id} post={post}/>
         ))}
     </main>
  );
}
