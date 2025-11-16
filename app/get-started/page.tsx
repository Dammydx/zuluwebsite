'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Store as StoreIcon, Package } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function GetStartedPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleClick = (role: string) => {
    if (role === 'customer') {
      router.push('/register/customer');
    } else if (role === 'vendor') {
      router.push('/vendors');
    } else if (role === 'brand') {
      router.push('/brands');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left side - info */}
        <div className="flex w-full flex-col items-center justify-center bg-emerald-600 px-6 py-12 sm:px-10 lg:w-1/2">
          <div className="max-w-md text-center lg:text-left text-white">
            <h1 className="mb-4 text-3xl sm:text-4xl font-bold leading-tight">
              From the Hearts of Local Markets
            </h1>
            <p className="mb-6 text-lg sm:text-xl text-emerald-100">
              to the Palm of Your Hand
            </p>

            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <span className="text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Authentic Local Markets</h3>
                  <p className="text-emerald-50">
                    Direct access to Nigeria&apos;s finest vendors
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <span className="text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Trusted & Verified</h3>
                  <p className="text-emerald-50">
                    Every vendor and brand is verified
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <span className="text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Seamless Experience</h3>
                  <p className="text-emerald-50">
                    Shop, sell, or grow your brand easily
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - role selection */}
        <div className="flex w-full items-center justify-center bg-gray-50 px-6 py-12 sm:px-10 lg:w-1/2">
          <div className="w-full max-w-2xl">
            <h2 className="mb-2 text-center text-2xl sm:text-3xl font-bold text-gray-900">
              Join Zolu
            </h2>
            <p className="mb-8 text-center text-gray-600">
              Choose how you&apos;d like to get started
            </p>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card
                className="cursor-pointer border-2 transition-all hover:border-emerald-600 hover:shadow-lg"
                onClick={() => handleRoleClick('customer')}
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <ShoppingBag className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Customer</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Shop from local markets and trusted brands
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Get Started →
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer border-2 transition-all hover:border-emerald-600 hover:shadow-lg"
                onClick={() => handleRoleClick('vendor')}
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <StoreIcon className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Vendor</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Sell your products to customers nearby
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Get Started →
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer border-2 transition-all hover:border-emerald-600 hover:shadow-lg"
                onClick={() => handleRoleClick('brand')}
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <Package className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Brand</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Showcase your products to the market
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Get Started →
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
