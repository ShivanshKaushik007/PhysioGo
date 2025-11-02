"use client"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"; // <-- FIX 2: Use @clerk/nextjs
import React, { useState } from "react";
import Link from "next/link"; // <-- FIX 3: Use next/link
import { usePathname } from "next/navigation"; // Added: To check for active links
import { FiMenu, FiX } from "react-icons/fi";

// Helper component for active links (replaces NavLink functionality)
function NavLink({ href, children, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? "text-teal-600" : ""}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Make sure your logo is in the `public` folder
  const logoSrc = "/logo.png"; // <-- FIX 4: Use root path for public assets

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <img src={logoSrc} className="h-10" alt="PhysioGo Logo" />
        </Link>

        <nav className="hidden md:flex font-bold font-mono gap-6 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/AiMatcher">AI Matcher</NavLink>
          <NavLink href="/book">Book Physio</NavLink>         
          <NavLink href="/FindAPhysio">Find Physio</NavLink>
          <SignedIn>
            <NavLink href="/dashboard">Dashboard</NavLink>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Log in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col p-4 gap-3">
            <NavLink href="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink href="/book" onClick={() => setOpen(false)}>
              Book Your Physio
            </NavLink>
            <NavLink href="/AiMatcher" onClick={() => setOpen(false)}>
              Ai Matcher
            </NavLink>
            <NavLink href="/FindAPhysio" onClick={() => setOpen(false)}>
              Find A Physio
            </NavLink>
            <SignedIn>
              <NavLink href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
            </SignedIn>
            <NavLink href="/ContactUs" onClick={() => setOpen(false)}>
              Contact
            </NavLink>
            <Link
              href="/book"
              className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md"
              onClick={() => setOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}