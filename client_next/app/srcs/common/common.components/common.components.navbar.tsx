import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import pages from '../../page.config.json';
import {PageConfig} from '../common.dto';

const Navbar: React.FC = () => (
  <nav className="bg-slate-900 fixed w-full z-50 top-0 start-0 shadow-md">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <Image src="/logo.png" className="h-8" alt="Flowbite Logo" width={32} height={32} />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">SEOLIM</span>
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col text-white p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          {Object.keys(pages as PageConfig).map((page) => (
            <li key={page}>
              <Link href={(pages as PageConfig)[page].path} className="block py-2 px-3 rounded md:bg-transparent md:p-0" aria-current="page">{(pages as PageConfig)[page].title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
