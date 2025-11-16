'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

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
          {/* Logo only */}
          <Link href="/" className="flex items-center">
            <img
              src="/assets/zolu-logo.png"
              alt="Zolu Logo"
              className="h-22 w-20 object-contain" // increased size
            />
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-emerald-600',
                  pathname === link.href
                    ? 'text-emerald-600'
                    : 'text-gray-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
}
