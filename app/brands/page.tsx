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
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';

const totalSteps = 6;

export default function VendorRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Common fields for steps 1-5
    registrationMethod: 'phone',
    phoneNumber: '',
    verificationCode: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    location: '',
    productPreferences: [] as string[],
    receiveUpdates: false,
    // New fields for Vendor form (Step 6)
    registrationType: 'market',
    businessName: '',
    ownerName: '',
    businessPhoneNumber: '',
    businessEmail: '',
    businessType: '',
    vendorProductCategories: [] as string[],
    marketLocation: '',
    businessLogo: null as File | null,
    agreeToVendorPolicy: false,
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
        return <VendorFormStep formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />;
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
          <Progress value={(step / totalSteps) * 100} className="mt-2 h-1" />
        </div>
      </div>
      <div className="mx-auto max-w-lg px-4 py-12">{renderStep()}</div>
    </div>
  );
}

// Step 1: Let's Get Started
const GetStartedStep = ({ formData, setFormData, nextStep }: any) => (
  <div className="text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">Let&apos;s Get Started</h2>
    <p className="mb-8 text-gray-600">How would you like to register?</p>
    <div className="mb-6 grid grid-cols-2 gap-4">
      <Button
        variant={formData.registrationMethod === 'phone' ? 'outline' : 'ghost'}
        className={`h-auto py-3 ${formData.registrationMethod === 'phone' ? 'border-2 border-emerald-600 bg-emerald-50' : 'border'}`}
        onClick={() => setFormData({ ...formData, registrationMethod: 'phone' })}
      >
        <div className="flex flex-col">
          <span>Phone</span>
          <span className="text-xs font-normal text-emerald-700">Recommended</span>
        </div>
      </Button>
      <Button
        variant={formData.registrationMethod === 'email' ? 'outline' : 'ghost'}
        className={`h-auto py-3 ${formData.registrationMethod === 'email' ? 'border-2 border-emerald-600 bg-emerald-50' : 'border'}`}
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
      <p className="text-sm text-gray-500">
        We&apos;ll send a one-time code to verify your number
      </p>
    </div>
    <Button onClick={nextStep} className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
      Continue
    </Button>
  </div>
);

// Step 2: Verify Your Number
const VerifyNumberStep = ({ formData, nextStep }: any) => (
  <div className="text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">Verify Your Number</h2>
    <p className="mb-8 text-gray-600">
      We sent a 6-digit code to <strong>{formData.phoneNumber}</strong>
    </p>
    <div className="space-y-2 text-left">
      <Label htmlFor="verificationCode">Verification Code</Label>
      <Input
        id="verificationCode"
        placeholder="000000"
        className="text-center text-2xl tracking-[1em]"
      />
    </div>
    <p className="mt-4 text-sm text-gray-600">
      Didn&apos;t receive it?{' '}
      <button className="font-semibold text-emerald-600">Resend in 30s</button>
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
        <p className="text-sm text-gray-500">
          We&apos;ll use this name in our communications
        </p>
      </div>
    </div>
    <Button onClick={nextStep} className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
      Continue
    </Button>
  </div>
);

// Step 4: Where Are You?
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
      <p className="mb-8 text-gray-600">
        This helps us show nearby markets and delivery options
      </p>
      <div className="rounded-lg bg-gray-50 p-8">
        <MapPin className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
        {!locationDetected ? (
          <>
            <Button variant="secondary" onClick={detectLocation}>
              Use Current Location
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Zolu uses your location to show nearby markets. You can change this
              anytime.
            </p>
          </>
        ) : (
          <div className="rounded-lg border-2 border-emerald-600 bg-white p-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <CheckCircle2 className="float-left mr-2 h-5 w-5 text-emerald-600" />
                <span className="font-semibold">{formData.location}</span>
              </div>
              <button
                onClick={() => setLocationDetected(false)}
                className="text-sm font-semibold text-emerald-600"
              >
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

// Step 5: Personalize Your Experience
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
      <h2 className="mb-2 text-3xl font-bold text-gray-900">
        Personalize Your Experience
      </h2>
      <p className="mb-8 text-gray-600">
        Help us show you products you&apos;ll love (optional)
      </p>
      <div className="space-y-3 text-left">
        {preferences.map((pref) => (
          <label
            key={pref}
            className="flex items-center space-x-3 rounded-lg border p-4 transition-all hover:border-emerald-600"
          >
            <Checkbox
              checked={formData.productPreferences.includes(pref)}
              onCheckedChange={() => togglePreference(pref)}
            />
            <span className="font-medium">{pref}</span>
          </label>
        ))}
      </div>
      <label className="mt-6 flex items-start space-x-3 rounded-lg bg-gray-50 p-4 text-left">
        <Checkbox
          checked={formData.receiveUpdates}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, receiveUpdates: checked })
          }
        />
        <div className="text-sm">
          I&apos;d like to receive updates about special offers, new products, and
          market news
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
        Continue
      </Button>
    </div>
  );
};

// Step 6: Join as a Vendor (Final Form)
const VendorFormStep = ({ formData, setFormData, handleSubmit }: any) => {
  const toggleCategory = (category: string) => {
    const categories = formData.vendorProductCategories.includes(category)
      ? formData.vendorProductCategories.filter((c: string) => c !== category)
      : [...formData.vendorProductCategories, category];
    setFormData({ ...formData, vendorProductCategories: categories });
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Join as a Vendor</h2>
        <p className="text-gray-600">
          Grow your business with Zolu&apos;s digital marketplace
        </p>
      </div>
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="mb-3 block">I am registering as:</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={formData.registrationType === 'market' ? 'outline' : 'ghost'}
                  className={`h-auto py-3 text-left ${formData.registrationType === 'market' ? 'border-2 border-emerald-600 bg-emerald-50' : 'border'}`}
                  onClick={() => setFormData({ ...formData, registrationType: 'market' })}
                >
                  <div className="flex flex-col">
                    <span>Part of a Local Market</span>
                    <span className="text-xs font-normal text-gray-500">I operate from a physical market</span>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant={formData.registrationType === 'independent' ? 'outline' : 'ghost'}
                  className={`h-auto py-3 text-left ${formData.registrationType === 'independent' ? 'border-2 border-emerald-600 bg-emerald-50' : 'border'}`}
                  onClick={() => setFormData({ ...formData, registrationType: 'independent' })}
                >
                  <div className="flex flex-col">
                    <span>Independent / Other</span>
                    <span className="text-xs font-normal text-gray-500">I operate independently</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name <span className="text-red-600">*</span></Label>
                <Input id="businessName" placeholder="e.g., Mama Ngozi's Fresh Foods" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name <span className="text-red-600">*</span></Label>
                <Input id="ownerName" placeholder="Full name" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessPhoneNumber">Phone Number <span className="text-red-600">*</span></Label>
                <Input id="businessPhoneNumber" type="tel" placeholder="+234 800 000 0000" value={formData.businessPhoneNumber} onChange={(e) => setFormData({ ...formData, businessPhoneNumber: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input id="businessEmail" type="email" placeholder="business@example.com" value={formData.businessEmail} onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                  <SelectItem value="processor">Processor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Product Categories (Select all that apply)</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {['Grains & Cereals', 'Spices', 'Processed Foods', 'Fresh Produce', 'Livestock Feed', 'Meat & Poultry', 'Dairy Products', 'Other'].map((category) => (
                  <label key={category} className="flex items-center space-x-3 rounded-lg border p-3 transition-all hover:border-emerald-600">
                    <Checkbox checked={formData.vendorProductCategories.includes(category)} onCheckedChange={() => toggleCategory(category)} />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketLocation">Market / Location <span className="text-red-600">*</span></Label>
              <Input id="marketLocation" placeholder="e.g., Mile 12 Market, Lagos" value={formData.marketLocation} onChange={(e) => setFormData({ ...formData, marketLocation: e.target.value })} required />
              <p className="text-sm text-gray-500">We&apos;ll use this to connect you with nearby customers</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessLogo">Upload Business Logo / Image (Optional)</Label>
              <Input id="businessLogo" type="file" accept=".png,.jpg,.jpeg,.webp" onChange={(e) => setFormData({ ...formData, businessLogo: e.target.files?.[0] || null })} />
              <p className="text-sm text-gray-500">JPG, PNG or WEBP. Max 5MB. Recommended: 1200×1200px</p>
            </div>

            <label className="flex items-start space-x-3 rounded-lg bg-gray-50 p-4">
              <Checkbox checked={formData.agreeToVendorPolicy} onCheckedChange={(checked) => setFormData({ ...formData, agreeToVendorPolicy: checked as boolean })} required />
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

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
              Submit Application
            </Button>

            <p className="text-center text-sm text-gray-500">
              We&apos;ll review your application within 24-48 hours and send you an email with next steps.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
