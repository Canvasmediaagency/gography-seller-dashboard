"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuClock4 } from "react-icons/lu";
import { ImLink } from "react-icons/im";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiListDashesBold } from "react-icons/pi";

interface Trip {
  id: string
  name: string
  end_date: string
  travel_start_date: string
  travel_end_date: string
  seat_count: number
  price_per_person: number
  commission_type: string
  commission_amount: number
  cover_img: string | null
  flag_icon: string | null
  share_link: string | null
}

function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'sold' | 'unsold'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trips')

      if (!response.ok) {
        throw new Error('Failed to fetch trips')
      }

      const data = await response.json()
      setTrips(data.trips || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching trips:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const startDay = start.getDate()
    const endDay = end.getDate()
    const month = start.toLocaleDateString('en-US', { month: 'short' })
    const year = start.getFullYear()

    return `${startDay}-${endDay} ${month} ${year}`
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString()
  }

  const getCommissionDisplay = (trip: Trip) => {
    if (trip.commission_type === 'percent') {
      return `${trip.commission_amount}%`
    } else {
      return formatPrice(trip.commission_amount)
    }
  }

  const getFlag = (flagIcon: string | null) => {
    if (flagIcon) return flagIcon
    // Default flags based on common destinations
    return '🌍'
  }

  // Hardcode seller ID for now (later from session/login)
  const currentSellerId = "#12568"

  // Mock sales data - สร้างครั้งเดียวเมื่อ trips data โหลดเสร็จ
  const mockSalesData = useMemo(() => {
    if (trips.length === 0) return {}
    
    const salesData: { [tripId: string]: { soldSeats: number, hasSold: boolean, totalSoldSeats: number } } = {}
    
    trips.forEach((trip, index) => {
      // Random 70% chance ที่ seller คนนี้เคยขายทริปนี้
      const hasSold = Math.random() > 0.3
      const soldSeats = hasSold ? Math.floor(Math.random() * Math.min(5, trip.seat_count)) + 1 : 0
      
      // Mock total seats sold by all sellers (more realistic data)
      let totalSoldSeats: number
      if (index % 4 === 0) {
        // Some trips are nearly full (like 3/12, 6/12)
        totalSoldSeats = Math.floor(trip.seat_count * 0.25) // 25% sold
      } else if (index % 4 === 1) {
        // Some trips are half full
        totalSoldSeats = Math.floor(trip.seat_count * 0.5) // 50% sold  
      } else if (index % 4 === 2) {
        // Some trips are mostly full
        totalSoldSeats = Math.floor(trip.seat_count * 0.75) // 75% sold
      } else {
        // Some trips are almost sold out
        totalSoldSeats = Math.floor(trip.seat_count * 0.92) // 92% sold (8% remaining = red warning)
      }
      
      salesData[trip.id] = {
        soldSeats,
        hasSold,
        totalSoldSeats
      }
    })
    
    return salesData
  }, [trips]) // จะสร้างใหม่เฉพาะเมื่อ trips เปลี่ยน

  // Get seller's sales status for each trip
  const getSalesStatus = (tripId: string) => {
    return mockSalesData[tripId] || { soldSeats: 0, hasSold: false, totalSoldSeats: 0 }
  }

  // Filter trips based on active filter
  const filteredTrips = trips.filter(trip => {
    if (activeFilter === 'all') return true
    
    const salesStatus = getSalesStatus(trip.id)
    if (activeFilter === 'sold') {
      return salesStatus.hasSold
    } else if (activeFilter === 'unsold') {
      return !salesStatus.hasSold
    }
    return true
  })

  // Get counts for each filter
  const tripCounts = {
    all: trips.length,
    sold: trips.filter(trip => getSalesStatus(trip.id).hasSold).length,
    unsold: trips.filter(trip => !getSalesStatus(trip.id).hasSold).length
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Trip Information</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-gray-500">Loading trips...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Trip Information</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center text-red-600">
            <p>Error loading trips: {error}</p>
            <button
              onClick={fetchTrips}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      {/* Header */}
      <div className='mx-4'>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Trips Information</h1>

        {/* Filter Buttons and View Toggle */}
        <div className="flex justify-between items-center mb-6">
          {/* Filter Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-black text-white' 
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All trips ({tripCounts.all})
            </button>
            <button 
              onClick={() => setActiveFilter('sold')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'sold' 
                  ? 'bg-black text-white' 
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sold trips ({tripCounts.sold})
            </button>
            <button 
              onClick={() => setActiveFilter('unsold')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeFilter === 'unsold' 
                  ? 'bg-black text-white' 
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Unsold trips ({tripCounts.unsold})
            </button>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HiOutlineSquares2X2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <PiListDashesBold className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Trips Grid/List */}
      <div className='mx-4 mb-6'>
        {viewMode === 'list' ? (
          /* Table View */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm  text-gray-700">Trip Name</th>
                  <th className="px-4 py-3 text-center text-sm  text-gray-700">Travel Dates</th>
                  <th className="px-4 py-3 text-center text-sm  text-gray-700">Deadline</th>
                  <th className="px-4 py-3 text-center text-sm  text-gray-700">Seats</th>
                  <th className="px-4 py-3 text-center text-sm  text-gray-700">Sold</th>
                  <th className="px-4 py-3 text-center text-sm  text-gray-700">Commission</th>
                  <th className="px-4 py-3 text-center text-sm  text-gray-700"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTrips.map((trip) => {
                  const salesStatus = getSalesStatus(trip.id)
                  // Use the consistent mock data
                  const totalSoldSeats = salesStatus.totalSoldSeats
                  const remainingSeats = trip.seat_count - totalSoldSeats
                  const remainingPercent = (remainingSeats / trip.seat_count) * 100
                  const isLowSeats = remainingPercent < 20
                  
                  return (
                    <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                      {/* Trip Name with Image */}
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="relative w-30 h-17 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 rounded-lg overflow-hidden mr-3">
                            {trip.cover_img ? (
                              <img
                                src={trip.cover_img}
                                alt={trip.name}
                                className="absolute inset-0 w-full h-full object-cover object-center"
                                style={{ aspectRatio: '5/3' }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg">
                                {getFlag(trip.flag_icon)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-md">{trip.name}</h3>
                          </div>
                        </div>
                      </td>

                      {/* Travel Dates */}
                      <td className="px-4 py-4 text-center">
                        <div className="text-sm text-gray-900 ">
                          {formatDateRange(trip.travel_start_date, trip.travel_end_date)}
                        </div>
                      </td>

                      {/* Deadline */}
                      <td className="px-4 py-4 text-center">
                        <div className="text-sm text-gray-900 ">
                          {formatDate(trip.end_date)}
                        </div>
                      </td>

                      {/* Total Seats (with progress bar like in image) */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="text-sm">
                            <span className={`${isLowSeats ? 'text-red-600' : 'text-gray-900'} font-semibold`}>
                              {remainingSeats}
                            </span>
                            /{trip.seat_count} ที่นั่ง
                          </div>
                          {/* Progress bar */}
                          <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                              className={`h-2 rounded-full transition-all  bg-gray-900`}
                              style={{
                                width: `${Math.min(((trip.seat_count - remainingSeats) / trip.seat_count) * 100, 100)}%`
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* My Sales */}
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg text-gray-900">
                          {salesStatus.soldSeats}
                        </div>
                      </td>

                      {/* Commission */}
                      <td className="px-4 py-4 text-center">
                        <div className="text-lg  text-gray-900">
                          {formatPrice(trip.commission_amount)}
                        </div>
                      </td>

                      {/* Share Button */}
                      <td className="px-4 py-4 text-center">
                        <button 
                          disabled={remainingSeats === 0}
                          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm ${
                            remainingSeats === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                        >
                          <ImLink className='text-xs' />
                          <span>แชร์</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => {
            const salesStatus = getSalesStatus(trip.id)
            // Total seats remaining in the trip (not specific to this seller)
            const totalRemainingSeats = Math.floor(Math.random() * trip.seat_count)

            // Grid View Layout (existing)
            return (
              <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Trip Image with Price Overlay */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {trip.cover_img ? (
                    <img
                      src={trip.cover_img}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {getFlag(trip.flag_icon)}
                    </div>
                  )}

                  {/* Price Badge */}
                  <div className="absolute bottom-1 right-1 text-white px-3 py-1 rounded">
                    <div className="text-sm text-white font-bold text-right">Per person</div>
                    <div className="text-3xl font-bold text-right">{formatPrice(trip.price_per_person)}</div>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="p-4">
                  {/* Trip Title */}
                  <h3 className="font-bold text-gray-900 text-lg mb-4">{trip.name}</h3>

                  {/* Trip Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4 text-nowrap">
                    <div className="flex items-center gap-2">
                      {<LuPlaneTakeoff className='text-xl' />}
                      <span>Travel Dates</span>
                      <span className="flex-1" />
                      <span className="text-gray-900 font-semibold">
                        {formatDateRange(trip.travel_start_date, trip.travel_end_date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuClock4 className='text-xl' />
                      <span>Deadline</span>
                      <span className="flex-1" />
                      <span className="text-gray-900 font-semibold">
                        {formatDate(trip.end_date)} / {trip.seat_count} seats
                      </span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{totalRemainingSeats} seats</div>
                      <div className="text-xs text-gray-500">Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{salesStatus.soldSeats}</div>
                      <div className="text-xs text-gray-500">My Sales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(salesStatus.soldSeats * trip.commission_amount)}
                      </div>
                      <div className="text-xs text-gray-500">My Commission</div>
                    </div>
                  </div>

                  {/* Share Button */}
                  <button 
                    disabled={totalRemainingSeats === 0}
                    className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      totalRemainingSeats === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    <ImLink className='text-xl' />
                    <span>{totalRemainingSeats === 0 ? 'Sold Out' : 'Share Trip'}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        )}

        {filteredTrips.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {activeFilter === 'all' ? '' : activeFilter} trips available
            </h3>
            <p className="text-gray-600">
              {activeFilter === 'all' 
                ? 'There is no trip data in the system yet' 
                : `There are no ${activeFilter} trips at the moment`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TripsPage
