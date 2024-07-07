'use client'
import React from 'react';
import { navigationRoutes } from '@/app/constants/navigation';
import "./header.css";
import Link from 'next/link';
import {useRouter} from 'next/navigation';


function Header() {
    const router = useRouter()
    return (
        <header className="site-header">
        <div className="site-identity">
            <h1><Link href="/">Site Name</Link></h1>
        </div>  
        <nav className="site-navigation">
            <ul className="nav">
             {navigationRoutes.map((navItem,index) => 
             <li key={index} >
                <Link href={navItem.route}  passHref legacyBehavior>
                  <a>{navItem.linkVal}</a>
                </Link>
             </li>   
             )}
             <li>
                <button onClick={() => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("token");
                    router.push('/signin')
                }}>
                  Sign Out
                </button>
             </li>
            </ul>
        </nav>
        </header>
    );
}

export default Header;