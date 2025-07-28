import React from 'react'
import Link from 'next/link'

interface SidebarButtonProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  href?: string
  onClick?: () => void
}

function SidebarButton({ icon, label, isActive = false, href, onClick }: SidebarButtonProps) {
  const buttonClass = `
    w-full flex items-center gap-3 px-4 py-3 rounded-full text-left transition-all duration-200 transform
    ${isActive 
      ? 'bg-gray-800 text-white shadow-lg shadow-black/20 scale-[0.98] translate-y-[1px]' 
      : 'text-gray-700 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] active:translate-y-[1px]'
    }
  `

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        <span className="text-xl flex-shrink-0">{icon}</span>
        <span className="font-normal text-lg whitespace-nowrap">{label}</span>
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={buttonClass}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className="font-normal text-lg whitespace-nowrap">{label}</span>
    </button>
  )
}

export default SidebarButton
