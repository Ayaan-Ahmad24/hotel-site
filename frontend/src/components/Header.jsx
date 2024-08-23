import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-300'>
      <nav className='flex justify-between items-center p-6 px-10'>
        <h1 className='text-3xl font-semibold text-slate-700'>Stay<span className='text-blue-700'>Ease</span></h1>
        <ul className='flex gap-6'>
            <Link to='/' className='hover:underline cursor-pointer text-lg text-xl'>Home</Link>
            <Link to='/' className='hover:underline cursor-pointer text-lg text-xl'>About</Link>
            <Link to='/' className='hover:underline cursor-pointer text-lg text-xl'>Hotel</Link>
        </ul>
      </nav>
    </div>
  )
}
