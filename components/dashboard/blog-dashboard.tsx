import { Clock, FileText, MessageCircle, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RecentArticle from './recent-articles'
import { prisma } from '@/lib/prisma'

const BlogDashboard = async () => {
    const [articles, totalComments] = await Promise.all([
        prisma.article.findMany({
                orderBy:{
                    createdAt: 'desc',
                },
                include:{
                    comments: true,
                    author:{
                        select:{
                            name: true,
                            email: true,
                            imageUrl:true
                        }
                    }
                }
            }
        ),
        prisma.comment.count()
    ])
  return (
    <div className='flex-1 p-4 md:p-8'>
        <div className='flex justify-between items-center w-full'>
            <div>
                <h1 className='font-bold text-2xl'>Blog Dashboard</h1>
                <p className='py-4  '>Manage your content and analytics</p>
            </div>

            <div className="flex items-center space-x-2">
                {/* <PlusCircle className='h-5 w-5'/> */}
                <Link href="/dashboard/articles/create">
                    <Button>
                        <PlusCircle className='h-4 w-4'/>
                        New Article
                    </Button>
                </Link>
            </div>

        </div>

        <div className='grid md:grid-cols-3 md-8 gap-4'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='font-medium text-sm'>Total Article</CardTitle>
                    <FileText className='h-4 w-4'/>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{articles.length}</div>
                    <p className='text-sm mt-1 text-muted-foreground'>5 last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='font-medium text-sm'>Total Comments</CardTitle>
                    <MessageCircle className='h-4 w-4'/>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{totalComments}</div>
                    <p className='text-sm mt-1 text-muted-foreground'>12 awaiting moderation </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='font-medium text-sm'>Avg. Rating Time</CardTitle>
                    <Clock className='h-4 w-4'/>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>4.2</div>
                    <p className='text-sm mt-1 text-muted-foreground'>+0.6 from last month </p>
                </CardContent>
            </Card>
        </div>

        <RecentArticle articles={articles}/>
    </div>
  )
}

export default BlogDashboard
