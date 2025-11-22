'use client';

import { useState } from 'react';
import {
  Wallet,
  Eye,
  EyeOff,
  Gift,
  Ticket,
  User,
  ChevronRight,
  Lock,
  CheckCircle2,
  DollarSign,
  Package,
  Drumstick,
  Droplets,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const spinRewards = [
  {
    icon: <DollarSign className="h-6 w-6 text-yellow-500" />,
    name: 'Cash Prize',
    date: 'Jan 15, 2025',
    value: '₦1,000',
  },
  {
    icon: <Package className="h-6 w-6 text-red-500" />,
    name: 'Rice (1kg)',
    date: 'Jan 14, 2025',
    value: '1kg',
  },
  {
    icon: <Drumstick className="h-6 w-6 text-orange-500" />,
    name: 'Chicken (1kg)',
    date: 'Jan 13, 2025',
    value: '1kg',
  },
  {
    icon: <Droplets className="h-6 w-6 text-blue-500" />,
    name: 'Groundnut Oil',
    date: 'Jan 12, 2025',
    value: '1L',
  },
];

const accountInfo = [
  { label: 'Full Name', value: 'Chukwudi Okafor' },
  { label: 'Phone Number', value: '+234 801 234 5678' },
  { label: 'Email', value: 'chukwudi@example.com' },
  { label: 'Location', value: 'Lagos, Nigeria' },
];

export default function DashboardPage() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  return (
    <div className="space-y-8">
      {/* Zulu Wallet */}
      <Card className="overflow-hidden rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-emerald-100 p-3">
                <Wallet className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Zolu wallet</h2>
                <p className="text-sm text-gray-500">Your rewards balance</p>
              </div>
            </div>
            <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
              {isBalanceVisible ? (
                <Eye className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-4xl font-bold text-gray-900">
              {isBalanceVisible ? '₦3,500' : '******'}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                <span>Withdrawable</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-emerald-800">
                {isBalanceVisible ? '₦1,500' : '******'}
              </p>
            </div>
            <div className="rounded-xl bg-gray-100 p-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Locked</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-800">
                {isBalanceVisible ? '₦2,000' : '******'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spin Rewards */}
      <Card className="overflow-hidden rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-emerald-100 p-3">
              <Gift className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Spin Rewards</h2>
              <p className="text-sm text-gray-500">Your winnings from Spin-to-Win</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {spinRewards.map((reward, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-white p-2">{reward.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{reward.name}</p>
                    <p className="text-sm text-gray-500">{reward.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600">{reward.value}</p>
                  <p className="text-xs font-medium text-emerald-500">Redeemable</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Coupons */}
      <Card className="overflow-hidden rounded-2xl bg-emerald-50 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-white p-3">
              <Ticket className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Active Coupons</h2>
              <p className="text-sm text-gray-500">Your discount rewards</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4">
            <div>
              <p className="text-3xl font-bold text-emerald-600">60% OFF</p>
              <p className="text-sm text-gray-500">
                Valid for first orders within 90 days of launch
              </p>
            </div>
            <Button className="bg-emerald-600 font-semibold hover:bg-emerald-700">
              First 4 Orders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="overflow-hidden rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-emerald-100 p-3">
              <User className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Account Information
              </h2>
              <p className="text-sm text-gray-500">Your profile details</p>
            </div>
          </div>
          <div className="mt-6 divide-y divide-gray-200">
            {accountInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="text-sm text-gray-500">{info.label}</p>
                  <p className="font-semibold text-gray-800">{info.value}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
