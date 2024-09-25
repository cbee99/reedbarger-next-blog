import { Post, User } from "@prisma/client";
import Link from "next/link";
import styles from './Post.module.css'

interface Props {
    post: Post & {
        author: User | null;
    };
}

export default function Post({ post }: Props) {
    const authorName = post.author ? 
    post.author.name : "Anonymous"
    const date = new Date(post.createdAt).toLocaleString();

    return (
        <Link href={`/posts/${post.id}`} className={styles.post}>
            <h2>{post.title}</h2> 
            <p><b>{date}</b></p>

            <small>{authorName}</small>
        </Link>
        )
}
