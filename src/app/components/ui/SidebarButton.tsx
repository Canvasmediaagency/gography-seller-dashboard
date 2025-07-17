import React from 'react'

interface SidebarButtonProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

function SidebarButton({ icon, label, isActive = false, onClick }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-full text-left transition-all duration-200
        ${isActive 
          ? 'bg-black text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-normal text-lg">{label}</span>
    </button>
  )
}

export default SidebarButton
