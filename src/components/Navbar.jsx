import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-slate-800 text-white py-4'>
    <div className="logo">
        <span className=" mx-9 text-green-400 ">EveryOne Task</span>
    </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:text-green-600 transition-all'>Home</li>
        <li className='cursor-pointer hover:text-green-600 transition-all'>Your Plans</li>
      </ul>
   </nav>
  )
}

export default Navbar
