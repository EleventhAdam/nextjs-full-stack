import prisma from "@/lib/db"

export default async function Page(){
    const posts = await prisma.post.findMany({})
    
    return (
        <div>
            Page
        </div>
    )
}