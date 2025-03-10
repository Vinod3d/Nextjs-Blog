import {BlogFooter} from "@/components/home/blog-footer";
import Navbar from "@/components/home/header/navbar";
import HeroSection from "@/components/home/hero-section";
import TopArticles from "@/components/home/top-articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { AllArticlesPageSkeleton } from "../articles/page";
// import Navbar from "@/components/home/Navbar";

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">Featured Articles</h2>
                <p>Discover our most popular and trending content</p>
              </div>

            <Suspense fallback={<AllArticlesPageSkeleton/>}>
              <TopArticles/>
            </Suspense>
            <div className="mt-12 text-center">
              <Link href={"/articles"}>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"
                >
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <BlogFooter/>
    </div>
  )
}

export default Home