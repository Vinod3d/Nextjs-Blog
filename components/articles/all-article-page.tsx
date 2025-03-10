import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search } from "lucide-react";
import Link from "next/link";
import type { Prisma } from "@prisma/client";

type AllArticlePageProps = {
  articles: Prisma.ArticleGetPayload<{
    include: {
      author: {
        select:{
          name:true,
          email:true,
          imageUrl:true,
        }
      }
    }
  }>[]
};

const AllArticlePage: React.FC<AllArticlePageProps> = async ({
  articles,
}) => {
  
  if (articles.length === 0) return <NoSearchResults />;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="group relative overflow-hidden transition-all hover:shadow-lg text-left"
        >
          <div className="p-6">
            <Link href={`/articles/${article.id}`}>
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage}
                  alt="blog-image"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="mt-2 text-2xl">{article.category}</p>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <span className="text-sm">{article.author.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {" "}
                {article.createdAt.toDateString()}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AllArticlePage;

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      <h1 className="text-xl font-semibold text-foreground">
        No Results Found
      </h1>

      <p className="mt-2 text-muted-foreground text-sm">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}
