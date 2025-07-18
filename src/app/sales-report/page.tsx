"use client"
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

function SalesReportPage() {
  const chartData = [
    { month: 'Jan', value: 8500, fullMonth: 'January' },
    { month: 'Feb', value: 11200, fullMonth: 'February' },
    { month: 'Mar', value: 7600, fullMonth: 'March' },
    { month: 'Apr', value: 13500, fullMonth: 'April' },
    { month: 'May', value: 9200, fullMonth: 'May' }
  ]

  return (
    <div className='flex flex-col'>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Overall Sales Report</h1>
        <div className="flex-row flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://preview.redd.it/x6y3d49gnwr91.jpg?auto=webp&s=5c0f794837d70937b905925328923336af0d37b6"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className='text-xl text-gray-900 font-bold'>Mr.John Doe</p>
          <div className='border-gray-300 border rounded-full p-1'>
            <p className="text-[12px] text-gray-800 mx-2">Sale ID: #12568</p>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className='flex flex-row'>
        <div className='flex flex-row border-1 justify-between w-full max-w-3/4 items-center p-4 px-10 rounded-3xl shadow-lg mt-6'>
          <div className='flex flex-col items-start gap-2'>
            <p>Total sales</p>
            <p className='text-3xl font-bold text-gray-900'>459,500.-</p>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <p>Trips Sold</p>
            <p className='text-3xl font-bold text-gray-900'>4 Trips</p>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <p>Total Commission</p>
            <p className='text-3xl font-bold text-gray-900'>45,950.-</p>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <p>Ranking</p>
            <p className='text-3xl font-bold text-gray-900'>1st</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className='flex flex-row items-start justify-between m-6 mt-10 gap-12'>
        <div className='w-1/2'>
          <div className=''>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-xl font-bold text-gray-900'>Total Sales Summary</h3>
              <select className="px-3 py-1 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="6m">6 months</option>
                <option value="1m">1 month</option>
                <option value="3m">3 months</option>
                <option value="1y">1 year</option>
              </select>
            </div>

            <div className='mb-4'>
              <p className='text-3xl font-bold text-gray-900'>495,000.-</p>
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
                    <p className='text-sm font-semibold text-gray-900 mb-1'>{item.value.toLocaleString()}.-</p>
                    <p className='text-xs text-gray-500'>{item.month}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className='w-1/2'>
          <div className=''>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold text-gray-900'>Commission Target</h3>
              <button className='text-sm text-gray-900 underline'>Edit</button>
            </div>
            
            {/* Progress */}
            <div className='mb-6'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-3xl font-bold text-gray-900'>45,200.-</span>
                <span className='text-lg text-gray-500'>/ 100,000.-</span>
              </div>
              
              {/* Progress Bar */}
              <div className='w-full bg-gray-200 rounded-full h-3'>
                <div className='bg-black h-3 rounded-full' style={{width: '45.2%'}}></div>
              </div>
            </div>

            {/* Trip List */}
            <div className='space-y-4'>
              <h4 className='font-semibold text-gray-900 mb-3'>Latest Sold Bucket List Trips</h4>
              
              {/* Trip 1 */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='w-6 h-6 bg-gray-100 rounded text-center text-sm font-medium'>1</span>
                  <span className='text-lg'>🇮🇸</span>
                  <div>
                    <p className='font-medium text-gray-900'>2025 Aurora Trails</p>
                    <p className='text-sm text-gray-600'>in Iceland</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>12 people</p>
                  <p className='text-sm font-semibold'>14,290.-</p>
                </div>
              </div>

              {/* Trip 2 */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='w-6 h-6 bg-gray-100 rounded text-center text-sm font-medium'>2</span>
                  <span className='text-lg'>🇮🇹</span>
                  <div>
                    <p className='font-medium text-gray-900'>2025 Summer</p>
                    <p className='text-sm text-gray-600'>in Dolomites</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>8 people</p>
                  <p className='text-sm font-semibold'>9,500.-</p>
                </div>
              </div>

              {/* Trip 3 */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='w-6 h-6 bg-gray-100 rounded text-center text-sm font-medium'>3</span>
                  <span className='text-lg'>🇨🇦</span>
                  <div>
                    <p className='font-medium text-gray-900'>2025 CANADA</p>
                    <p className='text-sm text-gray-600'>AUTUMN</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>4 people</p>
                  <p className='text-sm font-semibold'>7,200.-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SalesReportPage
