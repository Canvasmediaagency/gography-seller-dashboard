import React from 'react'
import Image from 'next/image'
import { BsColumnsGap } from "react-icons/bs";
import { LuPlaneTakeoff } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import SidebarButton from './ui/SidebarButton'

interface SidebarProps {
  className?: string
}

function Sidebar({ className }: SidebarProps) {
  return (
    <div className={`${className} bg-gray-50 border-r border-gray-200 min-h-screen`}>
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
           <Image
            src="/Logo.svg"
            alt="Gography Logo"
            width={184}
            height={38}
            className="h-9 w-auto"
            priority
          />
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          <SidebarButton 
            icon={<BsColumnsGap />}
            label="รายงานการขาย"
            isActive={false}
          />
          
          <SidebarButton 
            icon={<LuPlaneTakeoff />}
            label="ข้อมูลคนพิเศษ"
            isActive={true}
          />
          
          <SidebarButton 
            icon={<TbUsers />}
            label="รายงานเซลล์"
            isActive={false}
          />
        </nav>
      </div>
      {/* Footer */}
      <div className='p-4 border-t border-gray-200'>
        user
      </div>
    </div>
  )
}

export default Sidebar