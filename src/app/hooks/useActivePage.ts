'use client'

import { usePathname } from 'next/navigation'

export function useActivePage() {
  const pathname = usePathname()
  
  return {
    isSalesReport: pathname === '/sales-report',
    isSpecialData: pathname === '/Trips', 
    isSellReport: pathname === '/sell-report',
    isHome: pathname === '/'
  }
}
