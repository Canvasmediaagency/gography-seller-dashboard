import React from 'react'

function SalesReportPage() {
  return (
    <div>
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
    </div>
  )
}

export default SalesReportPage
