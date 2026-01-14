/* eslint-disable react/jsx-wrap-multilines */
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Navbar as SeolimNavbar } from "@seolim/designsystem";
import pages from "../../page.config.json";

type Props = {
  navbarType?: "default" | "fixed" | "sticky";
};
const Navbar: React.FC<Props> = ({ navbarType = "default" }) => {
  const [isMounted, setIsMounted] = useState(false);

  const pageList = useMemo(() => {
    const pageLinks: { label: string; href: string }[] = [];
    pages.order.forEach((key) => {
      if (key === "main") return;
      pageLinks.push({
        label: pages.page[key as keyof typeof pages.page].title,
        href: pages.page[key as keyof typeof pages.page].path,
      });
    });
    return pageLinks;
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SeolimNavbar
      type={navbarType}
      icon={
        <Image
          src="/logo.png"
          className="h-8"
          alt="Flowbite Logo"
          width={32}
          height={32}
          style={{ borderRadius: 32 }}
        />
      }
      title="SEOLIM"
      titleLink="/"
      links={pageList}
    />
  );
};

export default Navbar;
