'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, Share2, Copy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const prizes = [
  'N500 Credit',
  '80% Off',
  'N2000 Credit',
  'Free Delivery',
  'N1000 Credit',
  '60% Off',
  'Try Again',
  '10% Off',
];

interface Prize {
  name: string;
  type: string;
  value: number;
  currency?: string;
}

export function PrizeWheel({ onComplete }: { onComplete: (prize: Prize) => void }) {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [referralCode] = useState(`ZOLU-REF-${Math.floor(Math.random() * 100000)}`);

  const spinWheel = async () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    
    try {
      // Get userId and token from localStorage
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        toast({
          title: 'Error',
          description: 'Please log in to spin the wheel',
          variant: 'destructive',
        });
        setIsSpinning(false);
        return;
      }

      const user = JSON.parse(userStr);
      
      // Call the backend API
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      const response = await fetch(`${API_BASE}/auth/customer/prize-wheel/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: 'Error',
          description: data.error || 'Failed to spin wheel',
          variant: 'destructive',
        });
        setIsSpinning(false);
        return;
      }

      // ✅ UPDATE: Save the prize to localStorage immediately
      const updatedUser = {
        ...user,
        hasSpunWheel: true,
        prizeWon: data.prize
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Animate the wheel
      const randomIndex = Math.floor(Math.random() * prizes.length);
      const degreesPerSection = 360 / prizes.length;
      const baseDegrees = 360 * 5;
      const finalRotation = baseDegrees + randomIndex * degreesPerSection;

      setRotation(finalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        setHasSpun(true);
        setWonPrize(data.prize);
      }, 4000);

    } catch (error) {
      console.error('Spin wheel error:', error);
      toast({
        title: 'Error',
        description: 'Failed to spin wheel. Please try again.',
        variant: 'destructive',
      });
      setIsSpinning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: 'Copied!',
      description: 'Referral code copied to clipboard',
    });
  };

  const handleComplete = () => {
    if (wonPrize) {
      onComplete(wonPrize);
    }
  };

  const wheelSize = 400;
  const center = wheelSize / 2;
  const segmentRadius = wheelSize / 2 - 50;
  const circleRadius = wheelSize / 2 - 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {!hasSpun ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-2">
              <div className="flex items-center space-x-2 text-emerald-700">
                <Gift className="h-5 w-5" />
                <span className="font-semibold">Registration Complete!</span>
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Welcome to Zolu!
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Spin the wheel for your welcome reward
            </p>

            <div
              className="relative mx-auto mb-8"
              style={{ width: wheelSize, height: wheelSize }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: 'easeOut' }}
              >
                <svg viewBox={`0 0 ${wheelSize} ${wheelSize}`} className="h-full w-full">
                  {prizes.map((prize, index) => {
                    const numPrizes = prizes.length;
                    const startAngle = (360 / numPrizes) * index;
                    const endAngle = (360 / numPrizes) * (index + 1);
                    const midAngle = (startAngle + endAngle) / 2;
                    const radians = (midAngle * Math.PI) / 180;

                    const textX = center + segmentRadius * Math.cos(radians);
                    const textY = center + segmentRadius * Math.sin(radians);
                    const isGreen = index % 2 === 0;

                    return (
                      <g key={index}>
                        <path
                          d={`M${center} ${center} 
                              L${center + circleRadius * Math.cos((startAngle) * (Math.PI / 180))} ${
                            center + circleRadius * Math.sin((startAngle) * (Math.PI / 180))
                          } 
                              A${circleRadius} ${circleRadius} 0 0 1 ${
                            center + circleRadius * Math.cos((endAngle) * (Math.PI / 180))
                          } ${center + circleRadius * Math.sin((endAngle) * (Math.PI / 180))} 
                              Z`}
                          fill={isGreen ? '#10b981' : '#1f2937'}
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="600"
                          transform={`rotate(${midAngle + 90} ${textX} ${textY})`}
                        >
                          {prize}
                        </text>
                      </g>
                    );
                  })}
                  <circle
                    cx={center}
                    cy={center}
                    r="30"
                    fill="white"
                    stroke="#10b981"
                    strokeWidth="4"
                  />
                  <text x={center} y={center + 5} textAnchor="middle" fill="#10b981" fontSize="28">
                    🎁
                  </text>
                </svg>
              </motion.div>

              <div
                className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
                style={{ transform: 'translateX(-50%)' }}
              >
                <div className="h-0 w-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-600" />
              </div>
            </div>

            <Button
              size="lg"
              onClick={spinWheel}
              disabled={isSpinning}
              className="bg-emerald-600 text-lg hover:bg-emerald-700"
            >
              {isSpinning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Spinning...
                </>
              ) : (
                'Spin the Wheel'
              )}
            </Button>

            <p className="mt-4 text-sm text-gray-500">
              Each verified account gets one free spin
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-6 text-6xl">🎉</div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Congratulations!
            </h2>
            <p className="mb-2 text-2xl font-semibold text-emerald-600">
              You won: {wonPrize?.name}
            </p>
            {wonPrize?.type === 'discount' && (
              <p className="text-gray-600">
                {wonPrize.value}% off your next purchase
              </p>
            )}
            {wonPrize?.type === 'credit' && (
              <p className="text-gray-600">
                {wonPrize.currency}{wonPrize.value} credit added to your account
              </p>
            )}

            <Card className="mx-auto mb-6 mt-8 max-w-md border-2 border-emerald-200">
              <CardContent className="p-6">
                <p className="mb-4 text-sm font-semibold text-gray-700">
                  Want more spins?
                </p>
                <div className="mb-4 flex items-center justify-center space-x-2 rounded-lg bg-gray-100 p-3">
                  <code className="text-lg font-mono font-bold text-gray-900">
                    {referralCode}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyCode}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Button
              size="lg"
              onClick={handleComplete}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Start Shopping
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}