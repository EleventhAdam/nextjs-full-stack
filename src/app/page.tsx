import DeletePost from "@/components/delete-post";
import PostsForm from "@/components/posts-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { Post } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
	const posts: Post[] = await prisma.post.findMany({
		orderBy:{
			createdAt:'desc'
		}
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="w-full flex flex-col gap-2">
				{posts.map((post) => {
					return (
						<div key={post.id} className="p-3 flex justify-between items-center gap-2 border-2 border-black">
							{post.text}
							<div className="flex gap-2">
								<DeletePost postId={post.id} />
								<Link href={`post/${post.id}/update`}>
									<Button>
										Update
									</Button>
								</Link>
							</div>
						</div>
					)
				})}
			</div>
			<PostsForm />
		</main >
	);
}
