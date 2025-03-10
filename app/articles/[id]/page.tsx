import ArticleDetailPage from '@/components/articles/article-detail-page';
import { prisma } from '@/lib/prisma';
import React from 'react'

type ArticleDetailPageProps = {
    params: Promise<{id:string}>;
}

const page: React.FC<ArticleDetailPageProps> = async ({params}) => {
    const id = (await params).id
    const article = await prisma.article.findUnique({
        where: {id},
        include:{
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    });

    if(!article){
        return <div>Article not found</div>
    }
  return (
    <div>
        <ArticleDetailPage article={article}/>
    </div>
  )
}

export default page