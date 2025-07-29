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

  // Mock data for summary cards by month
  const summaryDataByMonth = {
    'June 2025': {
      totalTeamSales: 4500000,
      totalBranchCommission: 450000,
      teamMembersServed: 37,
      totalBranchTours: 115
    },
    'May 2025': {
      totalTeamSales: 3800000,
      totalBranchCommission: 380000,
      teamMembersServed: 32,
      totalBranchTours: 98
    },
    'April 2025': {
      totalTeamSales: 4200000,
      totalBranchCommission: 420000,
      teamMembersServed: 35,
      totalBranchTours: 105
    },
    'March 2025': {
      totalTeamSales: 3600000,
      totalBranchCommission: 360000,
      teamMembersServed: 29,
      totalBranchTours: 92
    }
  }

  // Mock data for top performers by month
  const topPerformersByMonth = {
    'June 2025': [
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
    ],
    'May 2025': [
      {
        rank: 1,
        name: "Siriporn Simaroj",
        sales: 1420000,
        commission: 142000,
        totalTrips: 16,
        totalTourMembers: 210,
        image: "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbHN8ZW58MHx8MHx8fDA%3D"
      },
      {
        rank: 2,
        name: "Rittisak Wongworakarn",
        sales: 1180000,
        commission: 118000,
        totalTrips: 14,
        totalTourMembers: 168,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      {
        rank: 3,
        name: "Natthawat Mongkoldee",
        sales: 1050000,
        commission: 105000,
        totalTrips: 11,
        totalTourMembers: 142,
        image: "https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6"
      }
    ],
    'April 2025': [
      {
        rank: 1,
        name: "Rittisak Wongworakarn",
        sales: 1650000,
        commission: 165000,
        totalTrips: 19,
        totalTourMembers: 258,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      {
        rank: 2,
        name: "Natthawat Mongkoldee",
        sales: 1380000,
        commission: 138000,
        totalTrips: 15,
        totalTourMembers: 195,
        image: "https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6"
      },
      {
        rank: 3,
        name: "Artisorn Wonprasit",
        sales: 1120000,
        commission: 112000,
        totalTrips: 13,
        totalTourMembers: 165,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    ],
    'March 2025': [
      {
        rank: 1,
        name: "Artisorn Wonprasit",
        sales: 1320000,
        commission: 132000,
        totalTrips: 17,
        totalTourMembers: 198,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      {
        rank: 2,
        name: "Phitchaya Tinsuraron",
        sales: 1150000,
        commission: 115000,
        totalTrips: 14,
        totalTourMembers: 176,
        image: "data:image/jpeg;base64,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"
      },
      {
        rank: 3,
        name: "Siriporn Simaroj",
        sales: 980000,
        commission: 98000,
        totalTrips: 12,
        totalTourMembers: 148,
        image: "https://images.unsplash.com/photo-1515077678510-ce3bdf418862?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbHN8ZW58MHx8MHx8fDA%3D"
      }
    ]
  }

  // Mock data for additional staff by month
  const additionalStaffByMonth = {
    'June 2025': [
      { rank: 4, name: "Sasithorn Charoensuk", sales: 780000, commission: 78000, totalTrips: 9, totalTourMembers: 115, image: "https://randomuser.me/api/portraits/women/44.jpg" },
      { rank: 5, name: "Pongsakorn Srisuk", sales: 650000, commission: 65000, totalTrips: 8, totalTourMembers: 98, image: "https://randomuser.me/api/portraits/men/32.jpg" },
      { rank: 6, name: "Nattapong Kittisak", sales: 520000, commission: 52000, totalTrips: 6, totalTourMembers: 78, image: "https://randomuser.me/api/portraits/men/45.jpg" },
      { rank: 7, name: "Kamonchanok Rattanapong", sales: 480000, commission: 48000, totalTrips: 5, totalTourMembers: 65, image: "https://randomuser.me/api/portraits/women/65.jpg" }
    ],
    'May 2025': [
      { rank: 4, name: "Pimchanok Sutham", sales: 720000, commission: 72000, totalTrips: 8, totalTourMembers: 105, image: "https://randomuser.me/api/portraits/women/68.jpg" },
      { rank: 5, name: "Worawit Chaiyaporn", sales: 580000, commission: 58000, totalTrips: 7, totalTourMembers: 89, image: "https://randomuser.me/api/portraits/men/51.jpg" },
      { rank: 6, name: "Chalita Phongchai", sales: 450000, commission: 45000, totalTrips: 5, totalTourMembers: 68, image: "https://randomuser.me/api/portraits/women/52.jpg" },
      { rank: 7, name: "Nattawut Suksawat", sales: 350000, commission: 35000, totalTrips: 4, totalTourMembers: 52, image: "https://randomuser.me/api/portraits/men/53.jpg" }
    ],
    'April 2025': [
      { rank: 4, name: "Sudarat Wongchai", sales: 850000, commission: 85000, totalTrips: 10, totalTourMembers: 125, image: "https://randomuser.me/api/portraits/women/77.jpg" },
      { rank: 5, name: "Kittipong Raksakul", sales: 680000, commission: 68000, totalTrips: 8, totalTourMembers: 95, image: "https://randomuser.me/api/portraits/men/77.jpg" },
      { rank: 6, name: "Narumon Srisuwan", sales: 520000, commission: 52000, totalTrips: 6, totalTourMembers: 75, image: "https://randomuser.me/api/portraits/women/81.jpg" },
      { rank: 7, name: "Preecha Charoen", sales: 420000, commission: 42000, totalTrips: 5, totalTourMembers: 58, image: "https://randomuser.me/api/portraits/men/81.jpg" }
    ],
    'March 2025': [
      { rank: 4, name: "Nattida Kongsuwan", sales: 750000, commission: 75000, totalTrips: 9, totalTourMembers: 110, image: "https://randomuser.me/api/portraits/women/90.jpg" },
      { rank: 5, name: "Surasak Sittichai", sales: 620000, commission: 62000, totalTrips: 7, totalTourMembers: 88, image: "https://randomuser.me/api/portraits/men/90.jpg" },
      { rank: 6, name: "Piyaporn Suksri", sales: 480000, commission: 48000, totalTrips: 6, totalTourMembers: 72, image: "https://randomuser.me/api/portraits/women/91.jpg" },
      { rank: 7, name: "Chatchai Wongdee", sales: 380000, commission: 38000, totalTrips: 4, totalTourMembers: 55, image: "https://randomuser.me/api/portraits/men/91.jpg" }
    ]
  }

  // Get current month's data
  const summaryData = summaryDataByMonth[selectedMonth as keyof typeof summaryDataByMonth]
  const topPerformers = topPerformersByMonth[selectedMonth as keyof typeof topPerformersByMonth]
  const additionalStaff = additionalStaffByMonth[selectedMonth as keyof typeof additionalStaffByMonth]

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
          <p className='text-gray-800 text-md mb-2'>Total Team Sales</p>
          <p className='text-3xl font-bold text-gray-800'>{summaryData.totalTeamSales.toLocaleString()}.-</p>
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <p className='text-gray-800 text-md mb-2'>Total Branch Commission</p>
          <p className='text-3xl font-bold text-gray-800'>{summaryData.totalBranchCommission.toLocaleString()}.-</p>
        </div>
          <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <p className='text-gray-800 text-md mb-2'>Total Branch Tours</p>
          <p className='text-3xl font-bold text-gray-800'>{summaryData.totalBranchTours} <span className='text-lg text-gray-500'>tours</span></p>
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <p className='text-gray-800 text-md mb-2'>Team Members Served</p>
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
              <p className='text-xs text-gray-800'>Commission: </p>
              <p className='text-xs text-gray-800 mb-2'>{topPerformers[1].commission.toLocaleString()}</p>
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
                <div className=' flex items-center justify-center'>
                  <span className='text-sm font-bold text-gray-600'>{staff.rank}</span>
                </div>
                
                {/* เพิ่มรูปหลัง ranking */}
                <div className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className='w-full h-full bg-gray-800 flex items-center justify-center' style={{display: 'none'}}>
                    <span className='text-orange-600 font-bold text-sm'>
                      {staff.name.charAt(0)}
                    </span>
                  </div>
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
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = target.nextElementSibling as HTMLElement;
                                    if (fallback) {
                                      fallback.style.display = 'flex';
                                    }
                                  }}
                                />
                                <div className='w-full h-full bg-gray-800 flex items-center justify-center' style={{display: 'none'}}>
                                  <span className='text-orange-600 font-bold text-xs'>
                                    {seller.name.charAt(0)}
                                  </span>
                                </div>
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


