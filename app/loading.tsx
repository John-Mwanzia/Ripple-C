import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
       <Image
        src = "https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
        alt = "loading"
        width = {200}
        height = {200}
         />
    </div>
  )
}
