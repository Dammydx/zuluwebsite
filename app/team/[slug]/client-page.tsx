'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TeamMember } from '../team-data';

interface TeamMemberClientPageProps {
  member: TeamMember;
}

export default function TeamMemberClientPage({
  member,
}: TeamMemberClientPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
              <Link href="/team" className="hover:text-emerald-600">
                Meet The Team
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-700">{member.name}</span>
            </div>
            <Link
              href="/team"
              className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </div>

          <Card className="overflow-hidden rounded-xl border-0 shadow-2xl">
            <CardContent className="p-6 sm:p-10">
              <div className="grid gap-8 md:grid-cols-3 md:gap-12">
                <div className="md:col-span-1">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
                <div className="md:col-span-2">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {member.name}
                  </h1>
                  <p className="mt-2 text-xl font-semibold text-emerald-600">
                    {member.title}
                  </p>
                  <div className="prose prose-lg mt-6 max-w-none text-gray-700">
                    {member.bioLong.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
