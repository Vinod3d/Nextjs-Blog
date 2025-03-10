"use client"

import { createComment } from '@/actions/create-comment'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useActionState } from 'react'

type commentInputProps = {
  articleId: string
}

const CommentInput : React.FC<commentInputProps> = ({articleId}) => {
  const [formState, action, isPending] = useActionState(createComment.bind(null, articleId), {errors:{}});

  return (
    <form action={action} className='mb-8'>
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src=''/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input type='text' name='body' placeholder='place a comment....'/>
          {formState.errors.body && (
            <p className='text-red-600 text-sm'>{formState.errors.body}</p>
          )}
          <div className='flex mt-4 justify-end'>
            <Button type='submit' disabled={isPending}>{isPending ? "Loading..." : "Post a Comment"}</Button>
          </div>
          {formState.errors.body && (
            <p className='p-2 border border-red-600'>{formState.errors.formErrors?.[0] || 'somthing web wrong'}</p>
          )}
        </div>
      </div>
    </form>
  )
}

export default CommentInput