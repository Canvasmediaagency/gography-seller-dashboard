'use client'

import React from 'react'
import Image from 'next/image'
import { BsColumnsGap } from "react-icons/bs";
import { LuPlaneTakeoff } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import SidebarButton from './ui/SidebarButton'
import { useActivePage } from '../hooks/useActivePage'
import { FiLogOut } from "react-icons/fi";

interface SidebarProps {
  className?: string
}

function Sidebar({ className }: SidebarProps) {
  const { isSalesReport, isSpecialData, isSellReport } = useActivePage()

  return (
    <div className={`${className} flex flex-col justify-between p-2 bg-gray-50 border-r border-gray-200 min-h-screen`}>
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
            label="Sales Report"
            href="/sales-report"
            isActive={isSalesReport}
          />

          <SidebarButton
            icon={<LuPlaneTakeoff />}
            label="Trip Information"
            href="/special-data"
            isActive={isSpecialData}
          />

          <SidebarButton
            icon={<TbUsers />}
            label="Sales Data"
            href="/sell-report"
            isActive={isSellReport}
          />
        </nav>
      </div>

      {/* Footer - User Info */}
      <div className="flex flex-col items-center p-4 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          </div>
          <div>
            <p className="text-lg text-gray-800">Sale ID: #12568</p>
          </div>
          <button className="p-2 text-gray-800 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <FiLogOut className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar