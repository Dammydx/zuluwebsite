'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, MapPin } from 'lucide-react';
import { PrizeWheel } from '@/components/prize-wheel';

export default function CustomerRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [registrationMethod, setRegistrationMethod] = useState<'phone' | 'email'>('phone');
  const [showWheel, setShowWheel] = useState(false);

  const [formData, setFormData] = useState({
    phoneOrEmail: '',
    verificationCode: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    location: '',
    preferences: [] as string[],
    agreeToTerms: false,
  });

  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowWheel(true);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const togglePreference = (pref: string) => {
    const prefs = formData.preferences.includes(pref)
      ? formData.preferences.filter((p) => p !== pref)
      : [...formData.preferences, pref];
    handleInputChange('preferences', prefs);
  };

  if (showWheel) {
    return <PrizeWheel onComplete={() => router.push('/')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-gray-600">
            Step {step} of {totalSteps}
          </div>
        </div>
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Let&apos;s Get Started
                </h1>
                <p className="text-gray-600">How would you like to register?</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setRegistrationMethod('phone')}
                  className={`flex-1 rounded-lg border-2 p-4 text-center transition-all ${
                    registrationMethod === 'phone'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm text-gray-600">Recommended</div>
                </button>
                <button
                  onClick={() => setRegistrationMethod('email')}
                  className={`flex-1 rounded-lg border-2 p-4 text-center transition-all ${
                    registrationMethod === 'email'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-gray-600">Alternative</div>
                </button>
              </div>

              <div className="space-y-2">
                <Label>
                  {registrationMethod === 'phone' ? 'Phone Number' : 'Email Address'}
                </Label>
                <Input
                  type={registrationMethod === 'phone' ? 'tel' : 'email'}
                  placeholder={
                    registrationMethod === 'phone'
                      ? '+234 800 000 0000'
                      : 'you@example.com'
                  }
                  value={formData.phoneOrEmail}
                  onChange={(e) => handleInputChange('phoneOrEmail', e.target.value)}
                />
                {registrationMethod === 'phone' && (
                  <p className="text-sm text-gray-500">
                    We&apos;ll send a one-time code to verify your number
                  </p>
                )}
              </div>

              <Button
                onClick={nextStep}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Verify Your Number
                </h1>
                <p className="text-gray-600">
                  We sent a 6-digit code to{' '}
                  <span className="font-semibold">{formData.phoneOrEmail}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label>Verification Code</Label>
                <Input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                  value={formData.verificationCode}
                  onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                />
                <p className="text-center text-sm text-gray-500">
                  Didn&apos;t receive it?{' '}
                  <button className="font-semibold text-emerald-600">
                    Resend in 30s
                  </button>
                </p>
              </div>

              <Button
                onClick={nextStep}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Tell Us About You
                </h1>
                <p className="text-gray-600">This helps us personalize your experience</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Name (Optional)</Label>
                <Input
                  placeholder="What should we call you?"
                  value={formData.preferredName}
                  onChange={(e) => handleInputChange('preferredName', e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  We&apos;ll use this name in our communications
                </p>
              </div>

              <Button
                onClick={nextStep}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Where Are You?</h1>
                <p className="text-gray-600">
                  This helps us show nearby markets and delivery options
                </p>
              </div>

              <div className="rounded-lg bg-gray-100 p-8">
                <MapPin className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
                <Button
                  variant="outline"
                  className="mx-auto flex items-center space-x-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Use Current Location</span>
                </Button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Zolu uses your location to show nearby markets. You can change this
                  anytime.
                </p>
              </div>

              <div className="text-center text-sm text-gray-500">Or enter address manually</div>

              <div className="space-y-2">
                <Input
                  placeholder="e.g., Lekki, Lagos"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              <Button
                onClick={nextStep}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Personalize Your Experience
                </h1>
                <p className="text-gray-600">
                  Help us show you products you&apos;ll love (optional)
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  'Fresh Produce',
                  'Grains & Cereals',
                  'Spices',
                  'Meat & Poultry',
                  'Dairy Products',
                  'Processed Foods',
                ].map((pref) => (
                  <label
                    key={pref}
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-all hover:border-emerald-600"
                  >
                    <Checkbox
                      checked={formData.preferences.includes(pref)}
                      onCheckedChange={() => togglePreference(pref)}
                    />
                    <span className="text-sm font-medium">{pref}</span>
                  </label>
                ))}
              </div>

              <label className="flex items-start space-x-3 rounded-lg bg-gray-50 p-4">
                <Checkbox
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange('agreeToTerms', checked as boolean)
                  }
                />
                <div className="text-sm">
                  <span className="text-gray-600">
                    I&apos;d like to receive updates about special offers, new products,
                    and market news
                  </span>
                </div>
              </label>

              <p className="text-center text-xs text-gray-500">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-emerald-600">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-emerald-600">
                  Privacy Policy
                </a>
              </p>

              <Button
                onClick={nextStep}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                Complete Registration
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
