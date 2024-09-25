import { revalidatePath } from 'next/cache'
import Link from "next/link"
import styles from './SignUp.module.css'
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"


 export default function SignUpPage() {

    async function submitAction(formData: FormData){
        "use server"
        const name = String(formData.get("name"))
        const email = String(formData.get("email"))
        const data = { name, email }

        if (name && email) {
            await prisma.user.create({ data })
            redirect("/")
        }
    }

     return (
        <div className={styles.page}>
            <form action={submitAction}>
                <h1>Sign Up</h1>
                <input name="name" placeholder="Name" type="text" required />
                <input name="email" placeholder="Email Address" type="email" required />
                <button type='submit'>Sign up</button>
                <Link className={styles.back} href="/">
                    or Cancel
                </Link>
            </form>
        </div>
    )
}