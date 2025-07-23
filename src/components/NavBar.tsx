"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { UserButton } from "./UserButton";
import {
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data?.user || null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-bold text-[#20b4b1]"
        >
          <BuildingOffice2Icon className="w-6 h-6" />
          <span className="sm:inline">Ploteasy</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-[#20b4b1]">Home</Link>
          <Link href="/property?transactionType=sale" className="text-gray-700 hover:text-[#20b4b1]">Buy</Link>
          <Link href="/property?transactionType=rent" className="text-gray-700 hover:text-[#20b4b1]">Rent</Link>
          <Link href="/user/properties" className="text-gray-700 hover:text-[#20b4b1]">Manage Properties</Link>
          <Link
            href="/property/add"
            className="bg-[#20b4b1] text-white px-4 py-2 rounded-lg hover:bg-[#1a9a97] transition flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Post Property
          </Link>
          {user ? (
            <UserButton />
          ) : (
            <Link
              href="/auth"
              className="border border-[#20b4b1] text-[#20b4b1] px-4 py-2 rounded-lg hover:bg-[#e6f7f7] transition"
            >
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20b4b1]"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-[#20b4b1]" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-[#20b4b1]" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] overflow-visible py-4 px-6" : "max-h-0 overflow-hidden px-6"
        } bg-white shadow-inner`}
      >
        <div className="flex flex-col space-y-4 text-base text-gray-700 font-medium">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#20b4b1]">Home</Link>
          <Link href="/property?transactionType=sale" onClick={() => setIsOpen(false)} className="hover:text-[#20b4b1]">Buy</Link>
          <Link href="/property?transactionType=rent" onClick={() => setIsOpen(false)} className="hover:text-[#20b4b1]">Rent</Link>
          <Link href="/user/properties" className="text-gray-700 hover:text-[#20b4b1]">Manage Properties</Link>

          <hr className="border-gray-300" />

          <Link
            href="/property/add"
            onClick={() => setIsOpen(false)}
            className="text-white bg-[#20b4b1] py-2 rounded-md text-center hover:bg-[#1a9a97] flex items-center justify-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Post Property
          </Link>

          {user ? (
            <div
              className="flex justify-center mt-2 relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <UserButton />
            </div>
          ) : (
            <Link
              href="/auth"
              onClick={() => setIsOpen(false)}
              className="text-[#20b4b1] border border-[#20b4b1] py-2 text-center rounded-md hover:bg-[#e6f7f7]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
