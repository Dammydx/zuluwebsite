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
import { MapPin, Mail } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
    file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-xl text-gray-600">Get in touch with the Zolu team</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="mt-1 h-5 w-5 text-emerald-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Head Office</h3>
                        <p className="text-sm text-gray-600">
                          IRL-Technologies Ltd, Abuja, FCT, Nigeria
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="mt-1 h-5 w-5 text-emerald-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Email Addresses
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>General: hello@zolu.ng</p>
                          <p>Creators: creators@zolu.ng</p>
                          <p>Partners: partners@zolu.ng</p>
                          <p>Support: support@zolu.ng</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t pt-8">
                    <h3 className="mb-4 font-semibold text-gray-900">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/about"
                          className="text-emerald-600 hover:underline"
                        >
                          About Zolu
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/get-started"
                          className="text-emerald-600 hover:underline"
                        >
                          Join Creator Circle
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/jobs"
                          className="text-emerald-600 hover:underline"
                        >
                          Career Opportunities
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog"
                          className="text-emerald-600 hover:underline"
                        >
                          Read Our Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Send Us a Message
                  </h2>

                  {submitted && (
                    <div className="mb-6 rounded-lg bg-emerald-50 p-4 text-center font-semibold text-emerald-700">
                      Successful! We&apos;ll get back to you soon.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
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
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="vendor">Vendor Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">Upload Optional Document</Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            file: e.target.files?.[0] || null,
                          })
                        }
                      />
                      <p className="text-sm text-gray-500">
                        Accepted formats: PDF, JPG, PNG
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      size="lg"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
