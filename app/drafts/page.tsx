 
import { revalidatePath } from 'next/cache'
import prisma from "@/lib/prisma"
import Post from "../components/Post"
import styles from "./Drafts.module.css"
import { redirect } from "next/navigation"
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DraftsPage() {
    const drafts = await prisma.post.findMany({
        where: {
            published: false,
        },
        include: {
            author: true,
            
        },
    })
    revalidatePath('/drafts')
    //redirect('/drafts')

    return (
        <main>
            <h1>Drafts</h1>
            {drafts.map(post => (
                <div key={post.id} className={styles.draft}>
                    <Post post={post}/>
                </div>
            ))}
        </main>
    )
}