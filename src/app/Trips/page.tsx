"use client"
import React, { useState, useEffect } from 'react'
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuClock4 } from "react-icons/lu";
import { ImLink } from "react-icons/im";

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
    return new Date(dateString).toLocaleDateString('th-TH', {
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
    const month = start.toLocaleDateString('th-TH', { month: 'short' })
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">ข้อมูลทริปทั้งหมด</h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800">
            ทั้งหมด
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50">
            ทริปที่กำลังขาย
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50">
            ทริปที่ขายไปแล้ว
          </button>
        </div>
      </div>

      {/* Trips Grid */}
      <div className='mx-4 mb-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
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
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white px-3 py-1 rounded">
                  <div className="text-xs text-gray-300">ราคาต่อคน</div>
                  <div className="text-lg font-bold">{formatPrice(trip.price_per_person)}</div>
                </div>
              </div>

              {/* Trip Info */}
              <div className="p-4">
                {/* Trip Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-1">{trip.name}</h3>

                {/* Trip Details */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    {<LuPlaneTakeoff className='text-xl' />}
                    <span>วันที่เดินทาง</span>
                    <span className="text-gray-900">
                      {formatDateRange(trip.travel_start_date, trip.travel_end_date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuClock4 className='text-xl' />
                    <span>ปิดรับ</span>
                    <span className="text-gray-900">
                      {formatDate(trip.end_date)} / {trip.seat_count} ที่นั่ง
                    </span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">3 ที่นั่ง</div>
                    <div className="text-xs text-gray-500">เหลืออีก</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">4</div>
                    <div className="text-xs text-gray-500">ขายไปแล้ว</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">5,000</div>
                    <div className="text-xs text-gray-500">คอมมิชชั่น</div>
                  </div>
                </div>

                {/* Share Button */}
                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <ImLink className='text-xl' />
                  <span>แชร์ทริป</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {trips.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่มีทริปที่พร้อมใช้งาน</h3>
            <p className="text-gray-600">ยังไม่มีข้อมูลทริปในระบบ</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TripsPage
