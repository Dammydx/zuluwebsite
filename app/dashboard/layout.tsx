'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Trophy,
  BarChart,
  CreditCard,
  Shield,
  MessageSquare,
  Megaphone,
  Settings,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';

const sidebarNavItems = [
  {
    title: 'Main',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '#', label: 'Creators', icon: Users },
      { href: '#', label: 'Leaderboard', icon: Trophy },
      { href: '#', label: 'Analytics', icon: BarChart },
    ],
  },
  {
    title: 'Management',
    items: [
      { href: '#', label: 'Payments', icon: CreditCard },
      { href: '#', label: 'Security', icon: Shield },
      { href: '#', label: 'Communications', icon: MessageSquare },
      { href: '#', label: 'Campaigns', icon: Megaphone },
    ],
  },
];

function SidebarNav({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-4">
      {sidebarNavItems.map((section) => (
        <div key={section.title}>
          <h3
            className={cn(
              'px-4 text-xs font-semibold uppercase text-white/70 transition-opacity duration-300',
              !isSidebarOpen && 'sr-only'
            )}
          >
            {section.title}
          </h3>
          <div className="mt-2 space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={isSidebarOpen ? undefined : item.label}
                className={cn(
                  'flex items-center rounded-md px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-emerald-700',
                  pathname === item.href ? 'bg-emerald-700' : '',
                  !isSidebarOpen && 'justify-center'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={cn(
                    'ml-3 overflow-hidden whitespace-nowrap transition-all duration-200',
                    isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 h-screen transform bg-emerald-600 transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0',
          isSidebarOpen ? 'w-64' : 'w-20',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-emerald-700 px-4">
            <Link
              href="/"
              className={cn(
                'flex items-center overflow-hidden whitespace-nowrap transition-all duration-200',
                isSidebarOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
              )}
            >
              <img
                src="/assets/zolu-logo-white.png"
                alt="Zolu Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden rounded-full p-2 text-white/80 hover:bg-emerald-700 lg:block"
            >
              <ChevronLeft
                className={cn(
                  'h-6 w-6 transition-transform',
                  !isSidebarOpen && 'rotate-180'
                )}
              />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <SidebarNav isSidebarOpen={isSidebarOpen} />
          </div>
          <div className="border-t border-emerald-700 p-4">
            <Link
              href="#"
              title={isSidebarOpen ? undefined : 'Settings'}
              className={cn(
                'flex items-center rounded-md px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-emerald-700',
                !isSidebarOpen && 'justify-center'
              )}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              <span
                className={cn(
                  'ml-3 overflow-hidden whitespace-nowrap transition-all duration-200',
                  isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'
                )}
              >
                Settings
              </span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex w-full flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6 lg:hidden">
          <Link href="/">
            <img
              src="/assets/zolu-logo.png"
              alt="Zolu Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>
        <div className="hidden lg:block">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
