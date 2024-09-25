import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About us",
    description: "Share your best thoughts",
}


export default function AboutPage() {
    return(
        <main>
           <h1>About us</h1>
           <p>We love to make awesome projects</p> 
        </main>
    )
}