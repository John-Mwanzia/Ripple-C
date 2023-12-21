import React from 'react'
import BottomNav from '../components/BottomNav'
import Banner from '../components/Banner'

export default function page() {
  return (
    <div className=''>
        <Banner />
        <div className='mt-4 flex justify-center rounded-md'>
            <button className='shadow-lg  px-4 py-2'>
                view team members
            </button>
        </div>
        <BottomNav />
    </div>
  )
}
