"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);
  return (
    <NextUINavbar maxWidth="xl" className="bg-transparent" position="sticky">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-2" href="/">
          <Image
            width={24}
            height={24}
            style={{
              // the logo is not visually balanced, so this is a fix to make the logo and name to be visually centerted
              // demo of issue: https://javier.xyz/visual-center
              marginTop: -6,
            }}
            alt="logo"
            src={"/logo.png"}
          />
          <p className="text-inherit font-light text-lg sm:text-sm text-pablo-500">
            Co:Helm
          </p>
        </NextLink>
      </NavbarBrand>
      <NavbarContent justify="end">
        {pathname.includes("history") ? (
          <Link as={NextLink} href="/">
            New request
          </Link>
        ) : (
          <Link as={NextLink} href="/history">
            History
          </Link>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
