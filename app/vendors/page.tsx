'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export default function VendorRegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    registrationType: 'market',
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    businessType: '',
    categories: [] as string[],
    location: '',
    logo: null as File | null,
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
          <h1 className="text-lg font-semibold">Vendor Registration</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-4xl font-bold text-gray-900">Join as a Vendor</h2>
          <p className="text-gray-600">
            Grow your business with Zolu&apos;s digital marketplace
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label>I am registering as:</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, registrationType: 'market' })
                    }
                    className={`rounded-lg border-2 p-4 text-left transition-all ${
                      formData.registrationType === 'market'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-semibold">Part of a Local Market</div>
                    <div className="text-sm text-gray-600">
                      I operate from a physical market
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, registrationType: 'independent' })
                    }
                    className={`rounded-lg border-2 p-4 text-left transition-all ${
                      formData.registrationType === 'independent'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-semibold">Independent / Other</div>
                    <div className="text-sm text-gray-600">I operate independently</div>
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Business Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., Mama Ngozi's Fresh Foods"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">
                    Owner Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="ownerName"
                    placeholder="Full name"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, businessType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                    <SelectItem value="producer">Producer/Farmer</SelectItem>
                    <SelectItem value="processor">Food Processor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Product Categories (Select all that apply)</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    'Grains & Cereals',
                    'Spices',
                    'Processed Foods',
                    'Fresh Produce',
                    'Livestock Feed',
                    'Meat & Poultry',
                    'Dairy Products',
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
                <Label htmlFor="location">
                  Market / Location <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Mile 12 Market, Lagos"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-500">
                  We&apos;ll use this to connect you with nearby customers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Upload Business Logo / Image (Optional)</Label>
                <Input
                  id="logo"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.files?.[0] || null })
                  }
                />
                <p className="text-sm text-gray-500">
                  JPG, PNG or WEBP. Max 5MB. Recommended: 1200×1200px
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
                      Vendor Policy
                    </a>{' '}
                    and understand that my application will be reviewed before approval
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
                We&apos;ll review your application within 24-48 hours and send you an
                email with next steps.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
