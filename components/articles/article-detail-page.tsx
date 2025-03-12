import type { Prisma } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LikeButton from "./like-btn";
import CommentList from "./comments/commentList";
import CommentInput from "./comments/comment-input";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type ArticleDetailPageProps = {
  article: Prisma.ArticleGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async ({ article }) => {
  const comments = await prisma.comment.findMany({
    where: {articleId:article.id},
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        }
      }
    }
  })

  const likes = await prisma.like.findMany({
    where: {articleId: article.id},
  })

  const { userId } = await auth();
  const user = userId
    ? await prisma.user.findUnique({ where: { clerkUserId: userId } })
    : null;
  const isLiked : boolean = likes.some((like)=> like.userId === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
             {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · {12} min read
                </p>
              </div>
            </div>
          </header>

          <section className="mb-12 max-w-none" dangerouslySetInnerHTML={{__html:article.content}}/>

          {/* Article Action Button */}

          <div className="mt-8">
            {/* Show Like button only if user is logged in */}
            {user ? <LikeButton articleId={article.id} isLiked={isLiked} likes={[]} /> : null}
          </div>

          <CommentList comments={comments} />

          {/* Only show comment input if the user is logged in */}
          {user && <CommentInput articleId={article.id} />}
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
