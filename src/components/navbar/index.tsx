"use client";

import Link from "next/link";
import { NavbarLinks, navbarLinks } from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbLogout } from "react-icons/tb";

export function Navbar() {
  const { user, isLoading } = useUser();
  return (
    <div className="fixed top-0 backdrop-blur-2xl z-[10] w-screen h-[70px] flex items-center justify-center">
      <nav className="w-full flex md:grid md:grid-cols-12 items-center justify-center px-8  max-w-[100vw] sm:max-w-[97vw] md:max-w-[98vw] mx-auto h-full">
        <div className="flex items-center md:col-span-3">
          <Link href="/dashboard">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://dl-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-footer.b49f032a.png&w=48&q=75"
              alt="logo"
              className="w-6 h-full"
            />
          </Link>
        </div>

        {user ? <NavbarLinks /> : <div className="col-span-6"></div>}

        <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
          {user ? (
            // eslint-disable-next-line @next/next/no-img-element

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarImage src={user.picture as string} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-pointer">
                {navbarLinks.map((item) => (
                  <DropdownMenuItem key={item.id}>
                    <Link
                      href={item.href}
                      className="group flex items-center px-4 py-2 font-semibold rounded-md gap-x-1"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <a
                    href="/api/auth/logout"
                    className="group flex items-center px-4 py-2 font-semibold rounded-md gap-x-1"
                  >
                    <TbLogout size={24} />
                    Logout
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isLoading ? null : (
            <div className="flex items-center gap-x-2">
              <Button asChild>
                <Link href={"/auth"} className="font-semibold">
                  Log in
                </Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
