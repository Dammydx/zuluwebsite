'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, MapPin, DollarSign, ChevronDown, X } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000); // 3 for now i set 3 sec - can be chnaged to 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setShowPopup(false), 2000); // close after 2 sec
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      {/* ---------------- MAIN HERO ---------------- */}
      <section
        className="relative flex min-h-[600px] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `
            url('/assets/Gradient.png'),
            url('/assets/Nigerian local market.png')
          `,
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center',
          backgroundBlendMode: 'multiply',
        }}
      >
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-5xl font-bold text-white md:text-6xl"
          >
            Shop Smart. Eat Healthy. Eat Zolu.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-xl text-white"
          >
            Nigeria&apos;s first digital market hub connecting vendors, agro
            brands, and consumers into one trusted ecosystem.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 text-lg text-gray-200"
          >
            Buy and sell locally, anywhere in Nigeria. Zolu brings your market
            to your phone — secure, fast, and reliable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/get-started">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Join Zolu Today
              </Button>
            </Link>
            <Link href="#why-zolu">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                Explore Markets
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <ChevronDown className="mx-auto h-8 w-8 animate-bounce text-white" />
          </motion.div>
        </div>
      </section>

      {/* ---------------- WHY ZOLU ---------------- */}
      <section id="why-zolu" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Why Choose Zolu?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the future of local market shopping
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Trusted & Verified
                </h3>
                <p className="text-gray-600">
                  Every vendor and brand undergoes strict verification to ensure
                  quality and authenticity
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Local & Convenient
                </h3>
                <p className="text-gray-600">
                  Discover markets and vendors near you with fast, reliable
                  delivery to your doorstep
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Best Prices
                </h3>
                <p className="text-gray-600">
                  Get authentic products directly from vendors at competitive
                  prices with exclusive deals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-emerald-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to Experience Local Markets Like Never Before?
          </h2>
          <p className="mb-8 text-xl text-emerald-50">
            Join thousands of happy customers, vendors, and brands on Zolu
          </p>
          <Link href="/get-started">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />

      {/* ---------------- WAITLIST POPUP ---------------- */}
<AnimatePresence>
  {showPopup && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 text-center">
              Join Our Waitlist
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Be the first to know when Zolu launches nationwide.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  @
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-10 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                />
              </div>

              {/* Phone Input with +234 prefix */}
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">
                  +234
                </span>
                <input
                  type="tel"
                  required
                  placeholder="812 345 6789"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-14 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Submit
              </Button>

              <p className="text-center text-sm text-gray-500">
                Already joined the waitlist? You can close this popup.
              </p>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              Thank you for joining!
            </h3>
            <p className="text-gray-600">We’ll keep you updated.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
