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

// ❌ REMOVED: import { Progress } from "@/components/ui/progress";
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

          {/* ✅ CUSTOM PROGRESS BAR (REPLACES shadcn Progress) */}
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

/* ------------------------- STEP COMPONENTS BELOW ------------------------- */

const GetStartedStep = ({ formData, setFormData, nextStep }: any) => (
  <div className="text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">Let&apos;s Get Started</h2>
    <p className="mb-8 text-gray-600">How would you like to register?</p>

    <div className="mb-6 grid grid-cols-2 gap-4">
      <Button
        variant={formData.registrationMethod === 'phone' ? 'outline' : 'ghost'}
        className={`h-auto py-3 ${
          formData.registrationMethod === 'phone'
            ? 'border-2 border-emerald-600 bg-emerald-50'
            : 'border'
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
          formData.registrationMethod === 'email'
            ? 'border-2 border-emerald-600 bg-emerald-50'
            : 'border'
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
      <p className="text-sm text-gray-500">
        We&apos;ll send a one-time code to verify your number
      </p>
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

/* The rest of your steps remain unchanged */