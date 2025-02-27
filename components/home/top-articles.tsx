import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TopArticles = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
      <Card
        className={cn(
          "group relative overflow-hidden transition-all hover:scale-[1.02] border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
        )}
      >
        <div className="p-6">
          <Link href={`/articles/${123}`}>
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
              <Image
                src="https://media.istockphoto.com/id/1292991881/photo/the-more-you-know-the-more-your-business-grows.webp?a=1&b=1&s=612x612&w=0&k=20&c=XAMGgXCZhjA5YdEQGY3-eRHsMaAUaAK_i1yEunReR8w="
                fill
                className="object-cover"
                alt=""
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                    <AvatarImage/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Vinod FullStack Developer</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">How To become frontend web developer in 2026</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                Web development
            </p>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date().toDateString()}</span>
                <span>{12} min read</span>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default TopArticles;
