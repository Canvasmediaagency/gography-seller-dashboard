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
    <>
      <div style={{ padding: '20px' }}>
        <h1>Gography - Trip Information Test</h1>
        
        {loading && <p>กำลังโหลดข้อมูล...</p>}
        
        {error && (
          <div style={{ color: 'red', marginBottom: '20px' }}>
            <p>Error: {error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <div>
            <p>พบข้อมูลทริปทั้งหมด: {trips.length} รายการ</p>
            
            {trips.length === 0 ? (
              <p>ไม่มีข้อมูลทริปในฐานข้อมูล</p>
            ) : (
              <div>
                {trips.map((trip) => (
                  <div key={trip.id} style={{ 
                    border: '1px solid #ccc', 
                    margin: '10px 0', 
                    padding: '15px',
                    borderRadius: '5px'
                  }}>
                    <h3>{trip.name}</h3>
                    <p>วันที่เดินทาง: {trip.travel_start_date} - {trip.travel_end_date}</p>
                    <p>วันสิ้นสุดการจอง: {trip.end_date}</p>
                    <p>จำนวนที่นั่ง: {trip.seat_count}</p>
                    <p>ราคาต่อคน: ฿{trip.price_per_person.toLocaleString()}</p>
                    <p>ค่าคอมมิชชั่น: {trip.commission_type === 'fix' ? '฿' : ''}{trip.commission_amount.toLocaleString()}{trip.commission_type === 'percent' ? '%' : ''}</p>
                    {trip.cover_img && <p>รูปปก: {trip.cover_img}</p>}
                    {trip.flag_icon && <p>ไอคอนธง: {trip.flag_icon}</p>}
                    {trip.share_link && <p>ลิงก์แชร์: {trip.share_link}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
