import UpdateForm from "@/components/update-form";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function UpdatePostPage({
    params
}: {
    params: { id: string }
}) {
    const postId = Number(params.id);
    if (!postId) redirect("/");
    const post = await prisma.post.findUnique({
        where:{
            id:postId
        }
    })
    if(!post) redirect("/")
    return (
        <div>
            <UpdateForm
                post={post}
            />
        </div>
    )
}