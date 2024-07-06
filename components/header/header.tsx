'use client'
import React from 'react';
import { navigationRoutes } from '@/constants/navigation';
import "./header.css";
import Link from 'next/link';


function Header() {
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
            </ul>
        </nav>
        </header>
    );
}

export default Header;