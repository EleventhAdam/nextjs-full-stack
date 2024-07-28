"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
    message?: string | null;
}

export async function addPosts(prevState: State, formDate: FormData) {
    const text = formDate.get("text") as string;
    if (text) {
        await prisma.post.create({
            data: {
                text
            }
        })
        revalidatePath("/");
        return {
            message: "success"
        }
    } else {
        return {
            message: "Invalid field."
        }
    }
}


export async function deletePost(postId: number) {
    try {
        await prisma.post.delete({
            where: {
                id: postId
            }
        })
        revalidatePath("/")
        return {
            message: "deleted a post!"
        }
    } catch {
        return {
            message: "Internal server error."
        }
    }
}

export async function updatePost(postId: number, prevState: State, formData: FormData) {
    try {
        const text = formData.get("text") as string;
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                text
            }
        })
    } catch (err) {
        console.log(err);
        return {
            message: "Invalid field"
        }
    }
    revalidatePath("/")
    redirect("/")
}

