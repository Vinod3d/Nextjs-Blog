"use client"

import { Bookmark, Share2, ThumbsUp } from 'lucide-react'
import React, { useOptimistic, useTransition } from 'react'
import { Button } from '../ui/button'
import { likeDislikeToggle } from '@/actions/like-dislike';
import { Like } from '@prisma/client';

type LikeButtonProps = {
    articleId:string;
    likes:Like[];
    isLiked:boolean
};

const LikeButton : React.FC<LikeButtonProps> = ({
    articleId,
    likes,
    isLiked
}) => {
    const [optimisticLike, setOptimisticLike] = useOptimistic(likes.length);
    const [isPending, startTransition] = useTransition();

    const handleLikeDislike = async ()=>{
        startTransition(async ()=>{
           setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1);
           await likeDislikeToggle(articleId);
        })
    }
  return (
    <div className='flex gap-4 mb-4 border-t pt-8'>
        <form action={handleLikeDislike}>
            <Button disabled={isPending} variant={'ghost'} className='gap-2'>
                <ThumbsUp className='h-5 w-4'/> {optimisticLike}
            </Button>
        </form>

        <Button variant={'ghost'} className='gap-2'>
            <Bookmark className='h-5 w-4'/>
        </Button>

        <Button variant={'ghost'} className='gap-2'>
            <Share2 className='h-5 w-4'/>
        </Button>
    </div>
  )
}

export default LikeButton