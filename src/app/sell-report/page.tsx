"use client"
import React, { useState } from 'react'

function SellReportPage() {
  const [selectedMonth, setSelectedMonth] = useState('June 2025')
  const [expandedTrip, setExpandedTrip] = useState<number | null>(0) // Default to first trip (index 0) expanded

  const toggleTrip = (index: number) => {
    if (expandedTrip === index) {
      setExpandedTrip(null) // Close if clicking on already expanded trip
    } else {
      setExpandedTrip(index) // Open the clicked trip (closes others automatically)
    }
  }

  // Mock data for summary cards
  const summaryData = {
    totalTeamSales: 4500000,
    totalBranchCommission: 450000,
    teamMembersServed: 37,
    totalBranchTours: 115
  }

  // Mock data for top performers
  const topPerformers = [
    {
      rank: 1,
      name: "Natthawat Mongkoldee",
      sales: 1580000,
      commission: 158000,
      totalTrips: 18,
      totalTourMembers: 245,
      image: "https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6"
    },
    {
      rank: 2,
      name: "Siriporn Simaroj",
      sales: 1250000,
      commission: 125000,
      totalTrips: 15,
      totalTourMembers: 189,
      image: "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbHN8ZW58MHx8MHx8fDA%3D"
    },
    {
      rank: 3,
      name: "Rittisak Wongworakarn",
      sales: 1230490,
      commission: 123049,
      totalTrips: 12,
      totalTourMembers: 156,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ]

  // Mock data for additional staff
  const additionalStaff = [
    { rank: 4, name: "Siriporn Simaroj", sales: 780000, commission: 78000, totalTrips: 9, totalTourMembers: 115 },
    { rank: 5, name: "Artisorn Wonprasit", sales: 650000, commission: 65000, totalTrips: 8, totalTourMembers: 98 },
    { rank: 6, name: "Phitchaya Tinsuraron", sales: 520000, commission: 52000, totalTrips: 6, totalTourMembers: 78 },
    { rank: 7, name: "Atiporn Kongkla", sales: 480000, commission: 48000, totalTrips: 5, totalTourMembers: 65 }
  ]

  // Mock data for trip performance
  const tripPerformance = [
    {
      flag: "🇮🇸",
      name: "2025 Aurora Trails in Iceland",
      price: 1200000,
      status: "Active",
      totalSold: 720000,
      target: 7200,
      availableSeats: 7,
      topSellers: [
        { name: "Natthawat Mongkoldee", sold: 3, amount: 360000, image: "https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6" },
        { name: "Siriporn Simaroj", sold: 2, amount: 240000, image: "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbHN8ZW58MHx8MHx8fDA%3D" },
        { name: "Rittisak Wongworakarn", sold: 2, amount: 240000, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }
      ]
    },
    {
      flag: "🇮🇹", 
      name: "2025 Summer in Dolomites",
      price: 1200000,
      status: "Active",
      totalSold: 840000,
      target: 6000,
      availableSeats: 5,
      topSellers: [
        { name: "Siriporn Simaroj", sold: 4, amount: 480000, image: "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbHN8ZW58MHx8MHx8fDA%3D" },
        { name: "Natthawat Mongkoldee", sold: 3, amount: 360000, image: "https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6" }
      ]
    },
    {
      flag: "🇨🇦",
      name: "2025 CANADA AUTUMN", 
      price: 1200000,
      status: "Active",
      totalSold: 960000,
      target: 8000,
      availableSeats: 8,
      topSellers: [
        { name: "Rittisak Wongworakarn", sold: 5, amount: 600000, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        { name: "Artisorn Wonprasit", sold: 3, amount: 360000, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
      ]
    },
    {
      flag: "🇷🇺",
      name: "2026 Into the Frozen Heart of Baikal",
      price: 960000,
      status: "Active",
      totalSold: 480000,
      target: 5000,
      availableSeats: 5,
      topSellers: [
        { name: "Natthawat Mongkoldee", sold: 3, amount: 288000, image: "https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6" },
        { name: "Phitchaya Tinsuraron", sold: 2, amount: 192000, image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
      ]
    },
    {
      flag: "🇺🇸",
      name: "2025 Utah's Red Rock Odyssey",
      price: 700000,
      status: "Active",
      totalSold: 420000,
      target: 6000,
      availableSeats: 6,
      topSellers: [
        { name: "Siriporn Simaroj", sold: 4, amount: 280000, image: "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbHN8ZW58MHx8MHx8fDA%3D" },
        { name: "Atiporn Kongkla", sold: 2, amount: 140000, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" }
      ]
    },
    {
      flag: "🇰🇪",
      name: "2025 KENYA & TANZANIA",
      price: 560000,
      status: "Active",
      totalSold: 336000,
      target: 4000,
      availableSeats: 4,
      topSellers: [
        { name: "Rittisak Wongworakarn", sold: 3, amount: 168000, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        { name: "Artisorn Wonprasit", sold: 3, amount: 168000, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
      ]
    },
    {
      flag: "🇩🇪",
      name: "2025 A Fairytale Journey...",
      price: 480000,
      status: "Active",
      totalSold: 240000,
      target: 5000,
      availableSeats: 5,
      topSellers: [
        { name: "Natthawat Mongkoldee", sold: 2, amount: 96000, image: "https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6" },
        { name: "Phitchaya Tinsuraron", sold: 3, amount: 144000, image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
      ]
    }
  ]

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1: return "🥇"
      case 2: return "🥈"
      case 3: return "🥉"
      default: return rank.toString()
    }
  }

  return (
    <div className='flex flex-col px-4 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='mb-4'>
        <div className='flex justify-between items-center mb-2'>
          <h1 className="text-3xl font-bold text-gray-800">Sales Report by Branch Staff</h1>
          <select
            className="px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="June 2025">June 2025</option>
            <option value="May 2025">May 2025</option>
            <option value="April 2025">April 2025</option>
            <option value="March 2025">March 2025</option>
          </select>
        </div>
        <p className="text-gray-600">Monthly Performance Report - {selectedMonth}</p>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-4 gap-6 mb-6 '>
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <p className='text-gray-600 text-sm mb-2'>Total Team Sales</p>
          <p className='text-3xl font-bold text-gray-800'>{summaryData.totalTeamSales.toLocaleString()}.-</p>
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <p className='text-gray-600 text-sm mb-2'>Total Branch Commission</p>
          <p className='text-3xl font-bold text-gray-800'>{summaryData.totalBranchCommission.toLocaleString()}.-</p>
        </div>
          <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <p className='text-gray-600 text-sm mb-2'>Total Branch Tours</p>
          <p className='text-3xl font-bold text-gray-800'>{summaryData.totalBranchTours} <span className='text-lg text-gray-500'>tours</span></p>
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <p className='text-gray-600 text-sm mb-2'>Team Members Served</p>
          <p className='text-3xl font-bold text-gray-800'>{summaryData.teamMembersServed} <span className='text-lg text-gray-500'>people</span></p>
        </div>
      
      </div>

      <div className='grid grid-cols-2 gap-6 '>
        {/* Top Performers Section */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='text-2xl font-bold text-gray-800 mb-2'>Top Performing Sales Staff</h3>
            <p className='text-gray-600 text-md mb-15'>Monthly Performance - {selectedMonth}</p>
          </div>
          {/* Top 3 with podium layout */}
          <div className='flex items-end justify-center gap-6 mb-8'>
            {/* 2nd Place - Left (Same height as 3rd) */}
            <div className='text-center mt-3 flex-1 max-w-[120px]'>
              <div className='relative flex flex-col items-center justify-center mb-3'>
                <div className='w-20 h-20 mb-2 rounded-full overflow-hidden '>
                  <img
                    src={topPerformers[1].image}
                    alt={topPerformers[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='absolute -bottom-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center'>
                  <span className='text-lg'>🥈</span>
                </div>
              </div>
              <p className='font-bold text-xs text-gray-800 mb-1 truncate'>{topPerformers[1].name}</p>
              <p className='text-xs text-gray-800 mb-1'>Sales: {topPerformers[1].sales.toLocaleString()}</p>
              <p className='text-xs text-gray-800 mb-2'>Commission: {topPerformers[1].commission.toLocaleString()}</p>
              <div className='flex items-center justify-center gap-1'>
                <span className='text-xs bg-gray-100 text-gray-800 px-1 py-1 rounded-full'>🌎 {topPerformers[1].totalTrips}</span>
                <span className='text-xs bg-orange-100 text-orange-600 px-1 py-1 rounded-full'>👥 {topPerformers[1].totalTourMembers}</span>
              </div>
            </div>

            {/* 1st Place - Center (Much Taller) */}
            <div className='text-center flex-1 max-w-[140px] transform -translate-y-10'>
              <div className='relative flex flex-col items-center justify-center mb-3'>
                <div className='w-20 h-20 mb-2 rounded-full overflow-hidden'>
                  <img
                    src={topPerformers[0].image}
                    alt={topPerformers[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='absolute -bottom-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center'>
                  <span className='text-xl'>🥇</span>
                </div>
              </div>
              <p className='font-bold text-sm text-gray-800 mb-1 truncate'>{topPerformers[0].name}</p>
              <p className='text-xs text-gray-800 mb-1'>Sales: {topPerformers[0].sales.toLocaleString()}</p>
              <p className='text-xs text-gray-800 mb-2'>Commission: {topPerformers[0].commission.toLocaleString()}</p>
              <div className='flex items-center justify-center gap-1'>
                <span className='text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full'>🌎 {topPerformers[0].totalTrips}</span>
                <span className='text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full'>👥 {topPerformers[0].totalTourMembers}</span>
              </div>
            </div>

            {/* 3rd Place - Right (Same height as 2nd) */}
            <div className='text-center flex-1 mt-3  max-w-[120px] '>
              <div className='relative flex flex-col items-center justify-center mb-3'>
                <div className='w-20 h-20 mb-2 rounded-full overflow-hidden'>
                  <img
                    src={topPerformers[2].image}
                    alt={topPerformers[2].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='absolute -bottom-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center'>
                  <span className='text-lg'>🥉</span>
                </div>
              </div>
              <p className='font-bold text-xs text-gray-800 mb-1 truncate'>{topPerformers[2].name}</p>
              <p className='text-xs text-gray-800 mb-1'>Sales: {topPerformers[2].sales.toLocaleString()}</p>
              <p className='text-xs text-gray-800 '>Commission:</p>
              <p className='text-xs text-gray-800 mb-2'>{topPerformers[2].commission.toLocaleString()}</p>
              <div className='flex items-center justify-center gap-1'>
                <span className='text-xs bg-gray-100 text-gray-800 px-1 py-1 rounded-full'>🌎 {topPerformers[2].totalTrips}</span>
                <span className='text-xs bg-orange-100 text-orange-600 px-1 py-1 rounded-full'>👥 {topPerformers[2].totalTourMembers}</span>
              </div>
            </div>
          </div>

          {/* Additional staff */}
          <div className='space-y-3'>
            {additionalStaff.map((staff) => (
              <div key={staff.rank} className='flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg'>
                <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
                  <span className='text-sm font-bold text-gray-600'>{staff.rank}</span>
                </div>
                <div className='flex-1'>
                  <p className='font-semibold text-gray-800 text-sm'>{staff.name}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-800'>Sales: {staff.sales.toLocaleString()}</p>
                  <p className='text-xs text-gray-600'>Commission: {staff.commission.toLocaleString()}</p>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full'>🌎 {staff.totalTrips}</span>
                  <span className='text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full'>👥 {staff.totalTourMembers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trip Performance Summary */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <h3 className='text-xl font-bold text-gray-800 mb-6'>Trip Performance Summary</h3>

          <div className='space-y-4'>
            {tripPerformance.map((trip, index) => (
              <div key={index} className='border border-gray-100 rounded-lg hover:bg-gray-50'>
                {/* Trip Header - Always Visible */}
                <div 
                  className='flex items-center gap-3 p-4 cursor-pointer'
                  onClick={() => toggleTrip(index)}
                >
                  <span className='text-xl'>{trip.flag}</span>
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-800 text-sm mb-1'>{trip.name}</p>
                  </div>
                  <div className='text-right flex items-center gap-3'>
                    <p className='font-bold text-gray-800 text-lg'>{trip.price.toLocaleString()}</p>
                    {/* Accordion Arrow */}
                    <div className='text-gray-400 transition-transform duration-200'>
                      {expandedTrip === index ? (
                        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Top Sellers - Collapsible Content */}
                {expandedTrip === index && (
                  <div className='px-4 pb-4 border-t border-gray-100'>
                    <div className='mt-3'>
                      <p className='text-[14px] text-gray-600 mb-2'>Top Sellers:</p>
                      <div className='space-y-2'>
                        {trip.topSellers.map((seller, sellerIndex) => (
                          <div key={sellerIndex} className='bg-white border border-gray-100 rounded p-3 shadow-sm'>
                            <div className='flex items-center gap-3 mb-2'>
                              <div className='w-8 h-8 rounded-full overflow-hidden flex-shrink-0'>
                                <img
                                  src={seller.image}
                                  alt={seller.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className='text-sm font-semibold text-gray-800'>{sellerIndex + 1}. {seller.name}</p>
                            </div>
                            <div className='grid grid-cols-3 gap-3 text-[14px] text-gray-600'>
                              <div className='flex flex-col'>
                                <span className='text-gray-500 mb-1 '>Sales</span>
                                <span className='font-semibold text-gray-800'>{seller.amount.toLocaleString()}</span>
                              </div>
                              <div className='flex flex-col'>
                                <span className='text-gray-500 mb-1'>Commission</span>
                                <span className='font-semibold text-orange-600'>{(seller.amount * 0.1).toLocaleString()}</span>
                              </div>
                              <div className='flex flex-col'>
                                <span className='text-gray-500 mb-1'>Customers</span>
                                <span className='font-semibold text-gray-800'>{seller.sold}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellReportPage


