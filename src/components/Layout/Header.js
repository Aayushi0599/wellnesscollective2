'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth  } from "@/context/AuthContext";
import logo from "@/images/logo.png";
import { useRouter } from "next/navigation";


const Header = () => {
  const { user,logout } = useAuth()
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  return (
    <div className="bg-black border-b  border-b-gray-700">
  
      <header className="container mx-auto text-white">
        <nav className="flex items-center justify-between flex-wrap px-4 py-1">
          <div className="flex items-center flex-shrink-0 mr-6">
          {user ? ( user.role==="host" ?  <Link href="/dashboard">
              <Image src={logo} alt="logo" width={120} />
            </Link>:
             <Link href="/event/attendee">
             <Image src={logo} alt="logo" width={120} />
           </Link>
  ):  <Link href="/">
  <Image src={logo} alt="logo" width={120} />
</Link>}
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200"
            >
              <svg
                className={`fill-current h-3 w-3 ${
                  isMenuOpen ? "hidden" : "block"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-3 w-3 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Close</title>
                <path d="M18.364 3.636a.999.999 0 00-1.414 0L10 8.586 3.05 1.636a.999.999 0 10-1.414 1.414L8.586 10l-6.95 6.95a.999.999 0 101.414 1.414L10 11.414l6.95 6.95a.999.999 0 101.414-1.414L11.414 10l6.95-6.95a.999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full lg:flex lg:items-center lg:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
         {user ? ( user.role==="host" ?  
         <div>
            <button onClick={() => {
              logout()
              router.push('/host_login')
            }}>
                <span className="bg-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-gray-800 text-sm tracking-wide font-semibold w-full py-3 px-7 rounded-3xl">
                 Logout
                </span>
              </button>
           </div>:
           <div>
             <button onClick={() => {
              logout()
              router.push('/login')
            }}>
                <span className="bg-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-gray-800 text-sm tracking-wide font-semibold w-full py-3 px-7 rounded-3xl">
                 Logout
                </span>
              </button>
           </div>) :
            <div className="text-sm flex lg:flex-row flex-col  gap-5 py-8 space-y-3 lg:space-y-0">
              <Link href="/host_login">
                <span className="bg-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black  font-semibold uppercase w-full py-3 px-7 rounded-3xl">
                  Host Login
                </span>
              </Link>
              <Link href="/login">
                <span  className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black  font-semibold uppercase w-full py-3 px-7 rounded-3xl">
                  Attend  an event
                </span>
              </Link>
            </div>}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;