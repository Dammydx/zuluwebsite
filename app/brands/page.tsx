'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

// removed import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';

const totalSteps = 6;

export default function BrandRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    registrationMethod: 'phone',
    phoneNumber: '',
    verificationCode: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    location: '',
    productPreferences: [] as string[],
    receiveUpdates: false,
    brandName: '',
    industryType: '',
    companySize: '',
    contactPerson: '',
    email: '',
    brandPhoneNumber: '',
    brandProductCategories: [] as string[],
    nafdacNumber: '',
    brandLogo: null as File | null,
    partnershipInterest: '',
    agreeToPolicy: false,
  });

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission logic here
    console.log('Form submitted:', formData);
    router.push('/');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GetStartedStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <VerifyNumberStep formData={formData} nextStep={nextStep} />;
      case 3:
        return <AboutYouStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 4:
        return <LocationStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 5:
        return <PersonalizeStep formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 6:
        return (
          <BrandFormStep
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto max-w-4xl items-center px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              {step === 1 ? (
                <Link href="/get-started">
                  <Button variant="ghost" className="pl-0">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" onClick={prevStep} className="pl-0">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
            </div>

            <div className="text-sm font-medium text-gray-600">
              Step {step} of {totalSteps}
            </div>

            <div className="w-10"></div>
          </div>

          {/* Custom progress bar (replaces shadcn Progress) */}
          <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-12">{renderStep()}</div>
    </div>
  );
}

/* ------------------------- STEP COMPONENTS ------------------------- */

const GetStartedStep = ({ formData, setFormData, nextStep }: any) => (
  <div className="text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">Let&apos;s Get Started</h2>
    <p className="mb-8 text-gray-600">How would you like to register?</p>
    <div className="mb-6 grid grid-cols-2 gap-4">
      <Button
        variant={formData.registrationMethod === 'phone' ? 'outline' : 'ghost'}
        className={`h-auto py-3 ${
          formData.registrationMethod === 'phone' ? 'border-2 border-emerald-600 bg-emerald-50' : 'border'
        }`}
        onClick={() => setFormData({ ...formData, registrationMethod: 'phone' })}
      >
        <div className="flex flex-col">
          <span>Phone</span>
          <span className="text-xs font-normal text-emerald-700">Recommended</span>
        </div>
      </Button>

      <Button
        variant={formData.registrationMethod === 'email' ? 'outline' : 'ghost'}
        className={`h-auto py-3 ${
          formData.registrationMethod === 'email' ? 'border-2 border-emerald-600 bg-emerald-50' : 'border'
        }`}
        onClick={() => setFormData({ ...formData, registrationMethod: 'email' })}
      >
        <div className="flex flex-col">
          <span>Email</span>
          <span className="text-xs font-normal text-gray-500">Alternative</span>
        </div>
      </Button>
    </div>

    <div className="space-y-2 text-left">
      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        type="tel"
        placeholder="+234 800 000 0000"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
      />
      <p className="text-sm text-gray-500">We&apos;ll send a one-time code to verify your number</p>
    </div>

    <Button onClick={nextStep} className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
      Continue
    </Button>
  </div>
);

const VerifyNumberStep = ({ formData, nextStep }: any) => (
  <div className="text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">Verify Your Number</h2>
    <p className="mb-8 text-gray-600">
      We sent a 6-digit code to <strong>{formData.phoneNumber}</strong>
    </p>

    <div className="space-y-2 text-left">
      <Label htmlFor="verificationCode">Verification Code</Label>
      <Input id="verificationCode" placeholder="000000" className="text-center text-2xl tracking-[1em]" />
    </div>

    <p className="mt-4 text-sm text-gray-600">
      Didn&apos;t receive it? <button className="font-semibold text-emerald-600">Resend in 30s</button>
    </p>

    <Button onClick={nextStep} className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
      Continue
    </Button>

    <div className="mt-8 flex items-center justify-center space-x-2 rounded-lg bg-gray-100 p-3 text-sm">
      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      <p>We&apos;ve sent a 6-digit code to your phone</p>
    </div>
  </div>
);

// Step 3: Tell Us About You
const AboutYouStep = ({ formData, setFormData, nextStep }: any) => (
  <div className="text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">Tell Us About You</h2>
    <p className="mb-8 text-gray-600">This helps us personalize your experience</p>

    <div className="space-y-6 text-left">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredName">Preferred Name (Optional)</Label>
        <Input
          id="preferredName"
          placeholder="What should we call you?"
          value={formData.preferredName}
          onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
        />
        <p className="text-sm text-gray-500">We&apos;ll use this name in our communications</p>
      </div>
    </div>

    <Button onClick={nextStep} className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
      Continue
    </Button>
  </div>
);

const LocationStep = ({ formData, setFormData, nextStep }: any) => {
  const [locationDetected, setLocationDetected] = useState(false);

  const detectLocation = () => {
    // Simulate location detection
    setTimeout(() => {
      setFormData({ ...formData, location: 'Lagos, Nigeria' });
      setLocationDetected(true);
    }, 1000);
  };

  return (
    <div className="text-center">
      <h2 className="mb-2 text-3xl font-bold text-gray-900">Where Are You?</h2>
      <p className="mb-8 text-gray-600">This helps us show relevant information for your region.</p>

      <div className="rounded-lg bg-gray-50 p-8">
        <MapPin className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
        {!locationDetected ? (
          <>
            <Button variant="secondary" onClick={detectLocation}>
              Use Current Location
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Zolu uses your location to personalize your experience. You can change this anytime.
            </p>
          </>
        ) : (
          <div className="rounded-lg border-2 border-emerald-600 bg-white p-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <CheckCircle2 className="float-left mr-2 h-5 w-5 text-emerald-600" />
                <span className="font-semibold">{formData.location}</span>
              </div>
              <button onClick={() => setLocationDetected(false)} className="text-sm font-semibold text-emerald-600">
                Change location
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="my-6 text-sm text-gray-500">Or enter address manually</p>
      <Button onClick={nextStep} className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
        Continue
      </Button>

      {locationDetected && (
        <div className="mt-8 flex items-center justify-center space-x-2 rounded-lg bg-gray-100 p-3 text-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <p>Location detected: {formData.location}</p>
        </div>
      )}
    </div>
  );
};

const PersonalizeStep = ({ formData, setFormData, nextStep }: any) => {
  const preferences = [
    'Fresh Produce',
    'Grains & Cereals',
    'Spices',
    'Meat & Poultry',
    'Dairy Products',
    'Processed Foods',
  ];

  const togglePreference = (preference: string) => {
    const newPreferences = formData.productPreferences.includes(preference)
      ? formData.productPreferences.filter((p: string) => p !== preference)
      : [...formData.productPreferences, preference];
    setFormData({ ...formData, productPreferences: newPreferences });
  };

  return (
    <div className="text-center">
      <h2 className="mb-2 text-3xl font-bold text-gray-900">Personalize Your Experience</h2>
      <p className="mb-8 text-gray-600">Help us show you products you&apos;ll love (optional)</p>

      <div className="space-y-3 text-left">
        {preferences.map((pref) => (
          <label
            key={pref}
            className="flex items-center space-x-3 rounded-lg border p-4 transition-all hover:border-emerald-600"
          >
            <Checkbox checked={formData.productPreferences.includes(pref)} onCheckedChange={() => togglePreference(pref)} />
            <span className="font-medium">{pref}</span>
          </label>
        ))}
      </div>

      <label className="mt-6 flex items-start space-x-3 rounded-lg bg-gray-50 p-4">
        <Checkbox
          checked={formData.receiveUpdates}
          onCheckedChange={(checked) => setFormData({ ...formData, receiveUpdates: checked as boolean })}
        />
        <div className="text-sm">
          I&apos;d like to receive updates about special offers, new products, and market news
        </div>
      </label>

      <p className="mt-6 text-xs text-gray-500">
        By continuing, you agree to our{' '}
        <a href="#" className="font-semibold text-emerald-600">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="font-semibold text-emerald-600">
          Privacy Policy
        </a>
      </p>

      <Button onClick={nextStep} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
        Finish Setup & Register as a Brand
      </Button>
    </div>
  );
};

const BrandFormStep = ({ formData, setFormData, handleSubmit }: any) => {
  const productCategories = [
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
  ];

  const handleCategoryChange = (category: string) => {
    setFormData((prev: any) => {
      const newCategories = prev.brandProductCategories.includes(category)
        ? prev.brandProductCategories.filter((c: string) => c !== category)
        : [...prev.brandProductCategories, category];
      return { ...prev, brandProductCategories: newCategories };
    });
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Brand Registration</h1>
        <h2 className="text-4xl font-bold text-gray-900">Partner with Zolu</h2>
        <p className="mt-2 text-gray-600">Connect your brand to Nigeria&apos;s digital marketplace</p>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Brand Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="brandName">
                  Brand Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="brandName"
                  placeholder="e.g., Golden Penny, Dangote, etc."
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industryType">
                    Industry Type <span className="text-red-600">*</span>
                  </Label>
                  <Select value={formData.industryType} onValueChange={(value) => setFormData({ ...formData, industryType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food-processing">Food Processing</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201+">201+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">
                  Contact Person <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="contactPerson"
                  placeholder="Full name"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandPhoneNumber">Phone Number</Label>
                  <Input
                    id="brandPhoneNumber"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.brandPhoneNumber}
                    onChange={(e) => setFormData({ ...formData, brandPhoneNumber: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Product Categories */}
            <div className="space-y-4">
              <Label>Product Categories (Select all that apply)</Label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {productCategories.map((category) => (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-all hover:border-emerald-600 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50"
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={formData.brandProductCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certification and Logo */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nafdacNumber">NAFDAC / Certification Number (Optional)</Label>
                <Input
                  id="nafdacNumber"
                  placeholder="e.g., NAFDAC-12345678"
                  value={formData.nafdacNumber}
                  onChange={(e) => setFormData({ ...formData, nafdacNumber: e.target.value })}
                />
                <p className="text-sm text-gray-500">This helps build trust with customers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandLogo">
                  Upload Brand Logo <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="brandLogo"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => setFormData({ ...formData, brandLogo: e.target.files?.[0] || null })}
                  required
                />
                <p className="text-sm text-gray-500">PNG or JPG. Recommended: 1200×1200px. Max 5MB</p>
              </div>
            </div>

            {/* Partnership Interest */}
            <div className="space-y-2">
              <Label htmlFor="partnershipInterest">Partnership Interest Description</Label>
              <Textarea
                id="partnershipInterest"
                placeholder="Tell us about your goals and how you'd like to partner with Zolu..."
                value={formData.partnershipInterest}
                onChange={(e) => setFormData({ ...formData, partnershipInterest: e.target.value })}
                rows={4}
              />
              <p className="text-sm text-gray-500">Share your vision for collaboration and what you hope to achieve</p>
            </div>

            {/* Agreement */}
            <label className="flex items-start space-x-3 rounded-lg bg-gray-50 p-4">
              <Checkbox
                id="agreeToPolicy"
                checked={formData.agreeToPolicy}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeToPolicy: checked as boolean })}
                required
              />
              <div className="text-sm">
                <Label htmlFor="agreeToPolicy" className="cursor-pointer text-gray-700">
                  I agree to Zolu&apos;s{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:underline">
                    Brand Partnership Policy
                  </a>{' '}
                  and understand that my application will be reviewed by our partnerships team
                </Label>
              </div>
            </label>

            {/* Submission */}
            <div className="text-center">
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                Submit Application
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                Our partnerships team will review your application and reach out within 48-72 hours.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

/* ------------------------- helper constants used in component ------------------------- */
const productCategories = [
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
];

function handleCategoryChange(category: string) {
  // placeholder - this function is shadowed inside BrandFormStep where setFormData is available
  // kept to avoid accidental reference errors if IDE/linters expect it
  return;
}