import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-950 to-indigo-950">
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl"></div>
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 md:flex-row md:py-32">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Conquer the World Through
            <span className="bg-gradient-to-t from-violet-400 bg-clip-text text-transparent ">
              {" "}
              Words
            </span>
          </h1>
          <p className="mx-auto ml-0 max-w-2xl text-lg text-gray-300 md:text-xl">
            Discover insightfull articles, thought-provoking stories, and expert
            perespectives on technology, lifestyle and innovation
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center md:justify-start">
            <Button className="rounded-full ">Start Reading</Button>
            <Button className="rounded-full " variant={"outline"}>
              Explore Topics
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 text-white md:mx-w-md">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">1k+</div>
              <div className="text-sm text-gray-400">Published Articles</div>
              <div></div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-gray-400">Expert Writer</div>
              <div></div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">10M</div>
              <div className="text-sm text-gray-400">Monthly Readers</div>
              <div></div>
            </div>

            {/* Image Frame */}
          </div>
        </div>
        <div className="mt-12 flex-1 md:mt-0">
          <div
            className={cn(
              "relative mx-auto w-64 h-64 rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-white/5 to-transparent",
              "border border-primary/20 backdrop-blur-lg",
              "shadow-2xl shadow-indigo-500/10 "
            )}
          >
            <Image
              src="https://media.istockphoto.com/id/1292991881/photo/the-more-you-know-the-more-your-business-grows.webp?a=1&b=1&s=612x612&w=0&k=20&c=XAMGgXCZhjA5YdEQGY3-eRHsMaAUaAK_i1yEunReR8w="
              fill
              className="object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
