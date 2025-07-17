'use client';

import { useEffect, useState } from 'react';

interface Trip {
  id: string;
  name: string;
  end_date: string;
  travel_start_date: string;
  travel_end_date: string;
  seat_count: number;
  price_per_person: number;
  commission_type: string;
  commission_amount: number;
  cover_img?: string;
  flag_icon?: string;
  share_link?: string;
}

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch trips');
        }

        setTrips(data.trips || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="p-6 bg-gray-500 w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gography - Trip Information Test</h1>
      
      {loading && <p className="text-gray-500">กำลังโหลดข้อมูล...</p>}
      
      {error && (
        <div className="text-red-600 mb-6 border border-red-200 bg-red-50 p-4 rounded">
          <p>Error: {error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <div>
          <p className="mb-4 text-gray-700">พบข้อมูลทริปทั้งหมด: <span className="font-semibold">{trips.length}</span> รายการ</p>
          
          {trips.length === 0 ? (
            <p className="text-gray-500">ไม่มีข้อมูลทริปในฐานข้อมูล</p>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="border border-gray-200 bg-white shadow-sm rounded-lg p-6"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{trip.name}</h3>
                  <p className="text-gray-600">วันที่เดินทาง: <span className="font-medium">{trip.travel_start_date} - {trip.travel_end_date}</span></p>
                  <p className="text-gray-600">วันสิ้นสุดการจอง: <span className="font-medium">{trip.end_date}</span></p>
                  <p className="text-gray-600">จำนวนที่นั่ง: <span className="font-medium">{trip.seat_count}</span></p>
                  <p className="text-gray-600">ราคาต่อคน: <span className="font-medium text-blue-600">฿{trip.price_per_person.toLocaleString()}</span></p>
                  <p className="text-gray-600">
                    ค่าคอมมิชชั่น: <span className="font-medium text-green-600">
                      {trip.commission_type === 'fix' ? '฿' : ''}
                      {trip.commission_amount.toLocaleString()}
                      {trip.commission_type === 'percent' ? '%' : ''}
                    </span>
                  </p>
                  {trip.cover_img && <p className="text-gray-500">รูปปก: <span className="underline">{trip.cover_img}</span></p>}
                  {trip.flag_icon && <p className="text-gray-500">ไอคอนธง: <span>{trip.flag_icon}</span></p>}
                  {trip.share_link && <p className="text-gray-500">ลิงก์แชร์: <span className="text-blue-500 underline">{trip.share_link}</span></p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
