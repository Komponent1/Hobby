import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import pages from '../../page.config.json';
import {Page, PageConfig} from '../common.dto';
import Portal from "./common.components.portal";
import LoadPage from "./common.components.loadPage";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const pageList: Page[] = useMemo(() => {
    const pageLinks: Page[] = [];
    Object.keys(pages as PageConfig).forEach((key) => {
      if (key === 'main') return;
      if (key === 'default') {
        (Object.keys(pages.default) as Array<keyof typeof pages.default>).forEach((subPage) => {
          pageLinks.push(pages.default[subPage]);
        });
      } else if (key === 'etc') {
        (Object.keys(pages.etc) as Array<keyof typeof pages.etc>).forEach((subPage) => {
          pageLinks.push(pages.etc[subPage]);
        });
      }
    });
    return pageLinks;
  }, []);
  const onLink = useCallback((page: Page) => {
    if (page.path === router.route) return;
    setIsLoad(true);
    router.push(page.path);
  }, [router]);

  return (
    <nav className="bg-slate-900 fixed w-full z-50 top-0 start-0 shadow-md">
      <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/logo.png" className="h-8" alt="Flowbite Logo" width={32} height={32} style={{borderRadius: 32}} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">SEOLIM</span>
          </div>
        </Link>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col text-white p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {pageList.map((page) => (
              <li key={page.title}>
                <button
                  type="button"
                  onClick={() => onLink(page)}
                  className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0"
                  aria-label="nav-link"
                >
                  {page.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Portal>
        <LoadPage isLoad={isLoad} />
      </Portal>
    </nav>
  );
};

export default Navbar;
