'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/vendors', label: 'Vendors' },
    { href: '/brands', label: 'Brand Creators' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/assets/zolu-logo.png"
              alt="Zolu Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center space-x-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-emerald-600',
                  pathname === link.href ? 'text-emerald-600' : 'text-gray-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700">
                Log In
              </Button>
            </Link>
            <Link href="/get-started">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="flex flex-col space-y-3 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base font-medium transition-colors hover:text-emerald-600',
                  pathname === link.href ? 'text-emerald-600' : 'text-gray-700'
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200 flex flex-col gap-3">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/get-started" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
