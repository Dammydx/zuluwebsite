'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BrandRegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    brandName: '',
    industryType: '',
    companySize: '',
    contactPerson: '',
    email: '',
    phone: '',
    categories: [] as string[],
    certificationNumber: '',
    logo: null as File | null,
    description: '',
    agreeToPolicy: false,
  });

  const toggleCategory = (category: string) => {
    const categories = formData.categories.includes(category)
      ? formData.categories.filter((c) => c !== category)
      : [...formData.categories, category];
    setFormData({ ...formData, categories });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-4">
          <Link href="/get-started">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Brand Registration</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-4xl font-bold text-gray-900">Partner with Zolu</h2>
          <p className="text-gray-600">
            Connect your brand to Nigeria&apos;s digital marketplace
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="brandName">
                  Brand Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="brandName"
                  placeholder="e.g., Golden Penny, Dangote, etc."
                  value={formData.brandName}
                  onChange={(e) =>
                    setFormData({ ...formData, brandName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industryType">
                    Industry Type <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.industryType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, industryType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food & Beverages</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="fmcg">FMCG</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="distribution">Distribution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      setFormData({ ...formData, companySize: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">1-50 employees</SelectItem>
                      <SelectItem value="medium">51-200 employees</SelectItem>
                      <SelectItem value="large">201-1000 employees</SelectItem>
                      <SelectItem value="enterprise">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4 font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">
                      Contact Person <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      placeholder="Full name"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData({ ...formData, contactPerson: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@brand.com"
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
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Product Categories (Select all that apply)</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    'Grains & Cereals',
                    'Spices & Seasonings',
                    'Processed Foods',
                    'Beverages',
                    'Cooking Oil',
                    'Dairy Products',
                    'Meat & Poultry',
                    'Agricultural Equipment',
                    'Packaging Materials',
                    'Other',
                  ].map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-3 rounded-lg border p-3 transition-all hover:border-emerald-600"
                    >
                      <Checkbox
                        checked={formData.categories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificationNumber">
                  NAFDAC / Certification Number (Optional)
                </Label>
                <Input
                  id="certificationNumber"
                  placeholder="e.g., NAFDAC-12345678"
                  value={formData.certificationNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, certificationNumber: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500">
                  This helps build trust with customers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">
                  Upload Brand Logo <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.files?.[0] || null })
                  }
                  required
                />
                <p className="text-sm text-gray-500">
                  PNG or JPG. Recommended: 1200×1200px. Max 5MB
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Partnership Interest Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your goals and how you'd like to partner with Zolu..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500">
                  Share your vision for collaboration and what you hope to achieve
                </p>
              </div>

              <label className="flex items-start space-x-3 rounded-lg bg-gray-50 p-4">
                <Checkbox
                  checked={formData.agreeToPolicy}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeToPolicy: checked as boolean })
                  }
                  required
                />
                <div className="text-sm">
                  <span className="text-gray-700">
                    I agree to Zolu&apos;s{' '}
                    <a href="#" className="text-emerald-600 hover:underline">
                      Brand Partnership Policy
                    </a>{' '}
                    and understand that my application will be reviewed by our
                    partnerships team
                  </span>
                </div>
              </label>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                Submit Application
              </Button>

              <p className="text-center text-sm text-gray-500">
                Our partnerships team will review your application and reach out within
                48-72 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
