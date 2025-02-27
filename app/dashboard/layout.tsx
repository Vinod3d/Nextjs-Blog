import LeftSidebar from '@/components/dashboard/left-sidebar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='min-h-screen w-full'>
        <div className='flex'>
            <LeftSidebar/>
            <div className='w-full'>{children}</div>
        </div>
    </div>
  )
}

export default layout