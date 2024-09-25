"use client"
import { revalidatePath } from "next/cache"
import { Post, User } from "@prisma/client"
import Markdown from "markdown-to-jsx";
import styles from "./PostDetails.module.css";
import { redirect, useRouter } from "next/navigation"

type Props = Post & {
    author: User | null
}

export default function PostDetails({ id, author, title, content, published, createdAt }: Props) {
     const router = useRouter()

     async function publishPost(id: number){
        console.log(`Publishing post ${id}`)
        //await fetch(`/api/posts/${id}/publish`, 
        await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "PUT",
        }, { next: { revalidate: 0 } });
        router.refresh()
        router.push('/')
     }

    async function deletePost(id: number){
        await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "DELETE",
        });
        router.refresh()
        router.push('/')
    }

    return (
        <main>
            <h1>{published ? title : `${title} (Draft)`}</h1>
            <p>by {author?.name || "anonymous"}</p>
            <section className={styles.section}>
                <Markdown>{content || ""}</Markdown>
            </section>
            {!published && (
                <button className={styles.button} onClick={() => publishPost(id)}>Publish</button>
            )}
            <button className={styles.button} onClick={() => deletePost(id)}>Delete</button>
        </main>
    )
}

 
