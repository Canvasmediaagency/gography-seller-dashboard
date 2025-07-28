import React from 'react'
import { X } from 'lucide-react'

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

interface TripInfoModalProps {
  isOpen: boolean
  onClose: () => void
  trip: Trip | null
}

const TripInfoModal: React.FC<TripInfoModalProps> = ({ isOpen, onClose, trip }) => {
  if (!isOpen || !trip) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Trip Information
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 hover:cursor-pointer rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Full Trips Information
            </h3>
            <p className="text-gray-600">
              Trip: {trip.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripInfoModal
