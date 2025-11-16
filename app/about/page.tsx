'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Users, Lightbulb, Award } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">About Zolu</h1>
          <p className="text-2xl text-emerald-600">
            Zolu by IRL-Technologies Ltd is redefining how Africa shops.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Overview</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                We connect local vendors, agro producers, and consumers into one powerful
                ecosystem that builds trust, transparency, and economic growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-emerald-600">Vision</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  Digitizing Nigeria&apos;s Local Market — One Hub at a Time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-emerald-600">Mission</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  To create a digital environment where every Nigerian vendor, farmer, or
                  brand can thrive, trade safely, and scale beyond local boundaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Core Values
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            <Card className="border-0 text-center shadow-lg">
              <CardContent className="p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <ShieldCheck className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Trust</h3>
              </CardContent>
            </Card>

            <Card className="border-0 text-center shadow-lg">
              <CardContent className="p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Community</h3>
              </CardContent>
            </Card>

            <Card className="border-0 text-center shadow-lg">
              <CardContent className="p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Lightbulb className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Innovation</h3>
              </CardContent>
            </Card>

            <Card className="border-0 text-center shadow-lg">
              <CardContent className="p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Award className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Excellence</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  Born out of the need to modernize Nigeria&apos;s informal retail
                  economy, Zolu bridges the gap between the physical market and digital
                  access.
                </p>
                <p>
                  We empower vendors with digital storefronts, connect consumers to safe
                  and authentic products, and help brands gain insight into real market
                  data.
                </p>
                <p>
                  From humble beginnings in local markets to becoming Nigeria&apos;s
                  premier digital marketplace, Zolu represents the future of African
                  commerce — where tradition meets technology, and every transaction
                  builds a stronger community.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Join the Zolu Movement
          </h2>
          <Link href="/get-started">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
