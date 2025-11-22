'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { teamData } from './team-data';

export default function TeamPage() {
  const [founder, ...otherMembers] = teamData;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Meet The Team
            </h1>
          </div>

          {/* Founder Section */}
          <div className="mt-16">
            <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="flex items-center justify-center p-4">
                  <img
                    src={founder.imageUrl}
                    alt={founder.name}
                    className="h-full w-full max-w-md rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <h2 className="text-3xl font-bold text-gray-900">{founder.name}</h2>
                  <p className="mt-2 text-lg font-semibold text-emerald-600">
                    {founder.title}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-gray-700">
                    {founder.bioShort}
                  </p>
                  <Link
                    href={`/team/${founder.slug}`}
                    className="mt-6 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Read Full Bio &rarr;
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Other Team Members */}
          <div className="mt-20">
            <p className="mx-auto max-w-3xl text-center text-lg text-gray-600">
              Our senior executives bring tremendous experience, visionary thinking and a
              shared commitment to excellence, creativity, and innovation to the day to
              day operation of the company.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherMembers.map((member) => (
              <Link key={member.id} href={`/team/${member.slug}`}>
                <Card className="group overflow-hidden rounded-xl border-0 shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-[1/1]">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm font-medium text-emerald-600">
                      {member.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
