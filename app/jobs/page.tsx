'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Code, TrendingUp, Video, BarChart } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function JobsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    resume: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">Work with Zolu</h1>
          <p className="text-xl text-gray-600">
            Build the Future of African Commerce
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Overview</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Zolu is expanding and looking for innovators passionate about local
                impact, inclusion, and growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Departments Hiring Soon
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <Code className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Engineering & Product
                </h3>
                <p className="text-gray-600">
                  Build scalable solutions that power Nigeria&apos;s digital marketplace
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Sales & Marketing
                </h3>
                <p className="text-gray-600">
                  Drive growth and connect communities across Nigeria
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <Video className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Social Media & Creator Management
                </h3>
                <p className="text-gray-600">
                  Amplify our voice and manage partnerships with creators
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <BarChart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Data & Operations
                </h3>
                <p className="text-gray-600">
                  Optimize processes and drive insights from marketplace data
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Join Us</h2>
              <p className="mb-4 text-lg text-gray-700">
                We&apos;re not just building software — we&apos;re building
                Nigeria&apos;s next digital economy.
              </p>
              <p className="text-lg text-gray-700">
                Grow your career, gain real impact, and access leadership exposure while
                working on challenges that matter to millions of Nigerians.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                Apply Now
              </h2>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mb-4 text-6xl">✓</div>
                  <h3 className="mb-2 text-2xl font-bold text-emerald-600">
                    Successful!
                  </h3>
                  <p className="text-gray-600">
                    Wait for feedback from our team. We&apos;ll review your application
                    and get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        setFormData({ ...formData, department: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">
                          Engineering & Product
                        </SelectItem>
                        <SelectItem value="sales">Sales & Marketing</SelectItem>
                        <SelectItem value="social">
                          Social Media & Creator Management
                        </SelectItem>
                        <SelectItem value="data">Data & Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message / Cover Note</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about yourself and why you want to join Zolu..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Upload Resume/CV</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resume: e.target.files?.[0] || null,
                        })
                      }
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Accepted formats: PDF, DOC, DOCX
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                  >
                    Submit Application
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
