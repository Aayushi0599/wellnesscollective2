import React from 'react'
import { FaVideo } from 'react-icons/fa';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { RiTeamFill } from 'react-icons/ri';
import Link from 'next/link';

const sideMenu = [
  {
    id:1,
    icon:<BsFillCalendarEventFill/>,
    name:"Events",
    url:"/dashboard"
  },
  {
    id:2,
    icon:<FaVideo/>,
    name:"Video Library",
    url:"/dashboard/vedieoLiabrary"
  },
  {
    id:3,
    icon:<RiTeamFill/>,
    name:"All Attendee",
    url:"/dashboard/team"
  },
]
const Sidebar = () => {
  return (
    <div className='w-full bg-gray-700 bg-opacity-20 rounded-xl px-5 py-8'>
      <div className='space-y-5'>
      <p>You are an event manager</p>
      <hr />
      </div>
      <div className='mt-5'>
        <ul className='space-y-6  '>
         {sideMenu.map((item)=>( <li key={item.id} > <Link href={item.url} className='flex items-center gap-3 text-center bg-black bg-opacity-30 border-r-4 active:border-primary shadow-md px-5 py-4 rounded-lg'>{item.icon} {item.name}</Link></li>))}
         </ul>
      </div>
    </div>
  )
}

export default Sidebar