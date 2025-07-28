"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/DateRangePicker"

function SalesReportPage() {
  // Commission Target States
  const [commissionTarget, setCommissionTarget] = useState(100000)
  const [isEditing, setIsEditing] = useState(false)
  const [tempTarget, setTempTarget] = useState(commissionTarget)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  // Date Range State - เริ่มต้นเป็น undefined เพื่อแสดง "All"
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  // Generate mock data based on date range using useMemo to prevent constant re-generation
  const getMockDataForDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from || !dateRange?.to) {
      // Default data when no date range selected (All)
      return {
        totalSales: 459500,
        tripsSold: 4,
        totalCommission: 45950,
        commissionRate: 10 // 10%
      }
    }

    // Create a seed based on the date range to ensure consistent random data
    const dateString = `${dateRange.from.getTime()}-${dateRange.to.getTime()}`
    const seed = dateString.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    // Seeded random function to ensure consistent results
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    // Calculate days in selected range
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    // Generate consistent random data based on date range
    const baseAmount = Math.floor(seededRandom(seed) * 50000) + 30000 // 30k-80k base
    const dailyAverage = Math.floor(baseAmount / Math.max(diffDays, 1))
    const totalSales = dailyAverage * diffDays + Math.floor(seededRandom(seed + 1) * 100000)

    // Commission rate between 7-12%
    const commissionRate = Math.floor(seededRandom(seed + 2) * 6) + 7 // 7-12%
    const totalCommission = Math.floor(totalSales * (commissionRate / 100))

    // Trips sold based on sales amount
    const tripsSold = Math.max(1, Math.floor(totalSales / 100000) + Math.floor(seededRandom(seed + 3) * 3))

    return {
      totalSales,
      tripsSold,
      totalCommission,
      commissionRate
    }
  }

  // Use useMemo to prevent constant re-generation of mock data
  const mockData = useMemo(() => {
    return getMockDataForDateRange(dateRange)
  }, [dateRange]) // Only regenerate when dateRange changes

  const currentCommission = 45950
  const progressPercentage = (currentCommission / commissionTarget) * 100

  // Animate progress bar on mount and when target changes
  useEffect(() => {
    setAnimatedProgress(0)
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [progressPercentage])

  const handleEdit = () => {
    setIsEditing(true)
    setTempTarget(commissionTarget)
  }

  const handleSave = () => {
    setCommissionTarget(tempTarget)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempTarget(commissionTarget)
    setIsEditing(false)
  }

  // Handle date range change
  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange)
    console.log('Date range changed:', newDateRange)
  }

  const chartData = [
    { month: 'Jan', value: 8500, fullMonth: 'January' },
    { month: 'Feb', value: 11200, fullMonth: 'February' },
    { month: 'Mar', value: 7600, fullMonth: 'March' },
    { month: 'Apr', value: 13500, fullMonth: 'April' },
    { month: 'May', value: 9200, fullMonth: 'May' }
  ]

  const tripsData = [
    {
      id: 1,
      image: 'https://www.wildfrontierstravel.com/media/cache/gallery_image/upload/mirror/dhruv-wildfrontierstravel-com/cd0f798d_dreamstimem194748912.jpeg',
      name: '2025 A Fairytale Journey: Germany-Austria-France',
      location: 'Europe Multi-Country',
      date: '15 - 25 May 2025',
      seats: [
        { status: 'done' },
        { status: 'done' },
        { status: 'cancel' },
        { status: 'pending' }
      ],
      totalSeats: 4,
      price: '142,900.-',
      commission: '14,290.-'
    },
    {
      id: 2,
      image: 'https://res-1.cloudinary.com/gorealtravel/image/upload/f_auto,q_auto/v1705507941/production/marketing/itinerary/65a7fa6329c62b000a19983d/marketing_picture/65a7fc5e29c62b000a1999c9/file/berchtesgaden-small.webp',
      name: '2025 Summer in Dolomites',
      location: 'Italy',
      date: '10 - 17 September 2025',
      seats: [
        { status: 'done' },
        { status: 'done' },
        { status: 'done' },
        { status: 'pending' },
        { status: 'pending' }
      ],
      totalSeats: 5,
      price: '95,000.-',
      commission: '9,500.-'
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiLz_JJqIzUg14AmqqvcPPAnVhHxq5jAcMLQ&s',
      name: '2025 KENYA & TANZANIA',
      location: 'East Africa Safari',
      date: '20 - 28 September 2025',
      seats: [
        { status: 'done' },
        { status: 'done' },
        { status: 'cancel' },
        { status: 'pending' }
      ],
      totalSeats: 4,
      price: '125,900.-',
      commission: '12,590.-'
    },
    {
      id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3kSwVTYLxZyI47s1VqDzGw6Id39kzUHtCMQ&s',
      name: '2025 Japan Cherry Blossom',
      location: 'Tokyo & Kyoto',
      date: '15 - 22 April 2025',
      seats: [
        { status: 'done' },
        { status: 'cancel' },
        { status: 'pending' },
        { status: 'pending' },
        { status: 'pending' },
        { status: 'pending' }
      ],
      totalSeats: 6,
      price: '89,000.-',
      commission: '8,900.-'
    }
  ]

  return (
    <div className='flex flex-col'>
      {/* Header */}
      <div className='mx-4'>
        <div className="flex-row flex items-center gap-3  pb-5 border-b border-gray-200">
          <div className="w-13 h-13 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              <p className='text-lg text-gray-800 flex font-bold'>Mr.John Doe </p>
              <p className='text-[12px] bg-orange-600/8 px-2 py-[2px] rounded-full text-orange-600 flex'>Ranking #2</p>
            </div>
            <p className="text-md text-gray-800">Sale ID: #12568</p>
          </div>

        </div>
        <div className='flex flex-row gap-8 items-end'>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Overall Sales Report</h1>
          <div className="mt-4">
            {/* date picker 1 */}
            <DateRangePicker
              date={dateRange}
              onDateChange={handleDateRangeChange}
            />
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className='flex flex-row'>
        <div className='flex flex-row gap-6 justify-between w-full items-center px-4 py-2  rounded-3xl mt-2 '>
          <div className='flex bg-white flex-col w-1/4 rounded-2xl p-4 px-6 border-1 shadow-sm  items-start gap-2'>
            <p>Total sales</p>
            <p className='text-3xl font-bold text-gray-800'>{mockData.totalSales.toLocaleString()}.-</p>
          </div>
          <div className='flex flex-col bg-white w-1/4 rounded-2xl p-4 px-6 border-1 shadow-sm items-start gap-2'>
            <p>Trips Sold</p>
            <p className='text-3xl font-bold text-gray-800'>{mockData.tripsSold} Trips</p>
          </div>
          <div className='flex flex-col bg-white w-1/4 rounded-2xl p-4 px-6 border-1 shadow-sm items-start gap-2'>
            <p>Total Commission</p>
            <p className='text-3xl font-bold text-gray-800'>{mockData.totalCommission.toLocaleString()}.-</p>
          </div>
          <div className='flex flex-col bg-white w-1/4 rounded-2xl p-4 px-6 border-1 shadow-sm items-start gap-2'>
            <p>Current Ranking</p>
            <div className="flex items-center gap-2">
              <p className='text-3xl font-bold text-gray-800'>2nd</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className='flex flex-row items-stretch justify-between m-4 mt-2 gap-6'>
        <div className='w-1/2'>
          <div className='rounded-2xl p-4 px-6 border-1 shadow-lg h-full bg-white'>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-xl font-bold text-gray-800'>Total Sales Summary</h3>
              <select className="px-3 py-1 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="6m">6 months</option>
                <option value="1m">1 month</option>
                <option value="3m">3 months</option>
                <option value="1y">1 year</option>
              </select>
            </div>

            <div className='mb-4'>
              <p className='text-3xl font-bold text-gray-800'>495,000.-</p>
            </div>

            {/* Bar Chart */}
            <div className='h-48 mt-4'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis hide />
                  <Bar
                    dataKey="value"
                    fill="#D1D5DB"
                    radius={[6, 6, 6, 6]}
                    barSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>

              {/* Values below bars */}
              <div className='flex justify-between px-8 mt-1'>
                {chartData.map((item, index) => (
                  <div key={index} className='text-center'>
                    <p className='text-sm font-semibold text-gray-800 mb-1'>{item.value.toLocaleString()}.-</p>
                    <p className='text-xs text-gray-500'>{item.month}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='w-1/2'>
          <div className='rounded-2xl p-4 px-6 border-1 shadow-lg h-full bg-white'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold text-gray-800'>Commission Target</h3>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className='text-sm text-gray-800 underline hover:text-gray-800 cursor-pointer'
                >
                  Edit
                </button>
              ) : (
                <div className='flex gap-2'>
                  <button
                    onClick={handleSave}
                    className='text-sm text-gray-800 underline hover:text-gray-800 cursor-pointer'
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className='text-sm text-gray-600 underline hover:text-gray-800'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Progress */}
            <div className='mb-6'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-3xl font-bold text-gray-800'>{currentCommission.toLocaleString()}.-</span>
                <span className='text-lg text-gray-500'>/ </span>
                {isEditing ? (
                  <input
                    type="number"
                    value={tempTarget}
                    onChange={(e) => setTempTarget(Number(e.target.value))}
                    className='text-lg text-gray-500 border border-gray-300 rounded px-2 py-1 w-32'
                    placeholder="Target amount"
                  />
                ) : (
                  <span className='text-lg text-gray-500'>{commissionTarget.toLocaleString()}.-</span>
                )}
              </div>

              {/* Progress Bar */}
              <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
                <div
                  className='bg-gradient-to-r from-gray-800 to-black h-3 rounded-full transition-all duration-1000 ease-out transform origin-left'
                  style={{
                    width: `${Math.min(animatedProgress, 100)}%`,
                    transform: `scaleX(${animatedProgress > 0 ? 1 : 0})`,
                  }}
                ></div>
              </div>
              <p className='text-xs text-gray-500 mt-1 transition-opacity duration-700 delay-500'>
                {progressPercentage.toFixed(1)}% of target
              </p>
            </div>

            {/* Trip List */}
            <div>
                <h4 className='font-semibold text-gray-800 mb-3'>Top 3 Best-Selling Trips</h4>
              <div className='flex gap-3'>
                {[
                  {
                    image: "https://www.wildfrontierstravel.com/media/cache/gallery_image/upload/mirror/dhruv-wildfrontierstravel-com/cd0f798d_dreamstimem194748912.jpeg",
                    name: "2025 Aurora Trails",
                    location: "in Iceland",
                    customers: "24",
                    commission: "14,290.-"
                  },
                  {
                    image: "https://res-1.cloudinary.com/gorealtravel/image/upload/f_auto,q_auto/v1705507941/production/marketing/itinerary/65a7fa6329c62b000a19983d/marketing_picture/65a7fc5e29c62b000a1999c9/file/berchtesgaden-small.webp",
                    name: "2025 Summer",
                    location: "in Dolomites",
                    customers: "8",
                    commission: "9,500.-"
                  },
                  {
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiLz_JJqIzUg14AmqqvcPPAnVhHxq5jAcMLQ&s",
                    name: "2026 Into the Frozen",
                    location: "Heart of Baikal",
                    customers: "4",
                    commission: "7,200.-"
                  }
                ].map((trip, idx) => (
                  <div key={idx} className='flex-1 border border-gray-200 rounded-lg overflow-hidden'>
                    <img 
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-16 object-cover"
                    />
                    <div className='p-2'>
                      <p className='font-bold text-sm text-gray-800 truncate'>{trip.name}</p>
                      <p className='text-xs text-gray-600 mb-2 truncate'>{trip.location}</p>
                      <div className='border-t border-gray-100 pt-2'>
                        <div className='flex justify-between items-center text-xs'>
                          <span className='text-gray-500'>Customers Sold</span>
                          <span className='font-semibold text-gray-800'>{trip.customers}</span>
                        </div>
                        <div className='flex justify-between items-center text-xs mt-1'>
                          <span className='text-gray-500'>Commission</span>
                          <span className='font-semibold text-gray-800'>{trip.commission}</span>
                        </div>
                      </div>
                    </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip selled List */}
      <div className='mx-4 mb-6 rounded-2xl shadow-lg bg-white border-1'>
        <div className="flex justify-between items-center p-4 ">
          <div className='flex flex-row items-center'>
            <h3 className='font-semibold text-xl text-gray-800'>Total Trips Sold</h3>
            <span className='px-4 py-1 text-white bg-orange-600 mx-4 rounded-full text-sm'>
              {tripsData.length} Trips
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <select className="px-3 py-1 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="6m">6 months</option>
              <option value="1m">1 months</option>
              <option value="3m">3 months</option>
              <option value="1y">1 year</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr>
          <th className="text-left px-4 py-2 text-md font-normal text-gray-700 w-[360px]">Trip Name</th>
          <th className="text-left px-4 py-2 text-md font-normal text-gray-700">Travel Date</th>
          <th className="text-left px-4 py-2 text-md font-normal text-gray-700">Customers</th>
          <th className="text-right px-4 py-2 text-md font-normal text-gray-700">Trip Price (per person)</th>
          <th className="text-right px-4 py-2 text-md font-normal text-gray-700">Total Commission</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {tripsData.map((trip) => (
              <tr key={trip.id}>
                {/* Trip Name */}
                <td className="p-4 w-[260px]">
                <div className="flex items-center gap-3">
                  <img 
                  src={trip.image} 
                  alt={trip.name}
                  className="w-24 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="truncate max-w-[300px]">
                  <p
                    className="text-gray-800 truncate"
                    title={trip.name}
                  >
                    {trip.name}
                  </p>
                  <p
                    className="text-sm text-gray-600 truncate"
                    title={trip.location}
                  >
                    {trip.location}
                  </p>
                  </div>
                </div>
                </td>

                  {/* Date */}
                  <td className="p-4">
                    <p className="text-sm text-gray-800">{trip.date}</p>
                  </td>

                  {/* Seats */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1 max-w-[120px]">
                        {Array.from({ length: Math.ceil(trip.totalSeats / 5) }).map((_, rowIdx) => (
                          <div key={rowIdx} className="flex gap-1">
                            {Array.from({ length: Math.min(5, trip.totalSeats - rowIdx * 5) }).map((_, colIdx) => {
                              const seatIdx = rowIdx * 5 + colIdx
                              const seat = trip.seats[seatIdx]
                              const getStatusColor = (status: string) => {
                                switch(status) {
                                  case 'done': return 'bg-orange-600'
                                  case 'cancel': return 'bg-gray-800'
                                  case 'pending': return 'bg-gray-300'
                                  default: return 'bg-gray-300'
                                }
                              }
                              return (
                                <div
                                  key={seatIdx}
                                  className={`w-3 h-3 rounded-[3px] ${getStatusColor(seat?.status)}`}
                                />
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>


                  {/* Price */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-800 text-right">{trip.price}</p>
                  </td>

                  {/* Commission */}
                  <td className="p-4">
                    <p className="font-bold text-gray-800 text-right">{trip.commission}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

export default SalesReportPage
