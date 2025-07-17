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
    w-full flex items-center gap-3 px-4 py-3 rounded-full text-left transition-all duration-200
    ${isActive 
      ? 'bg-black text-white shadow-lg' 
      : 'text-gray-700 hover:bg-gray-100'
    }
  `

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        <span className="text-xl">{icon}</span>
        <span className="font-normal text-lg">{label}</span>
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={buttonClass}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-normal text-lg">{label}</span>
    </button>
  )
}

export default SidebarButton
