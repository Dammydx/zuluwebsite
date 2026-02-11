'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, MapPin, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { PrizeWheel } from '@/components/prize-wheel';
import { useToast } from '@/hooks/use-toast';
import { customerAuthAPI } from '@/lib/api/customer-auth';

// Type definitions
interface FormData {
  phoneOrEmail: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  password: string;
  confirmPassword: string;
  location: {
    address: string;
    latitude: number | null;
    longitude: number | null;
    city: string;
    state: string;
    country: string;
  };
  preferences: string[];
  agreeToTerms: boolean;
}

export default function CustomerRegistrationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [registrationMethod, setRegistrationMethod] = useState<'phone' | 'email'>('phone');
  const [showWheel, setShowWheel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    phoneOrEmail: '',
    verificationCode: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    password: '',
    confirmPassword: '',
    location: {
      address: '',
      latitude: null,
      longitude: null,
      city: '',
      state: '',
      country: ''
    },
    preferences: [],
    agreeToTerms: false,
  });

  const totalSteps = 6; // Updated to 6 steps

  // Resend OTP timer effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const startResendTimer = () => {
    setResendTimer(30);
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

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Geolocation not supported',
        description: 'Your browser does not support geolocation',
        variant: 'destructive',
      });
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          setFormData({
            ...formData,
            location: {
              address: data.display_name || '',
              latitude,
              longitude,
              city: data.address?.city || data.address?.town || '',
              state: data.address?.state || '',
              country: data.address?.country || '',
            }
          });
          
          toast({
            title: 'Location found',
            description: 'Your location has been detected',
          });
        } catch (error) {
          setFormData({
            ...formData,
            location: {
              ...formData.location,
              latitude,
              longitude
            }
          });
          
          toast({
            title: 'Location detected',
            description: 'Please enter your address manually',
          });
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);
        toast({
          title: 'Location error',
          description: 'Unable to get your location. Please enter manually.',
          variant: 'destructive',
        });
      }
    );
  };

  const handleStep1Submit = async () => {
    if (!formData.phoneOrEmail.trim()) {
      toast({
        title: 'Required field',
        description: 'Please enter your phone number or email',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await customerAuthAPI.startRegistration(
        formData.phoneOrEmail,
        registrationMethod
      );

      if (response.success) {
        setUserId(response.userId);
        startResendTimer();
        toast({
          title: 'Verification code sent',
          description: 'Check your phone or email for the OTP',
        });
        setStep(2);
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to send verification code',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async () => {
    if (formData.verificationCode.length !== 6) {
      toast({
        title: 'Invalid code',
        description: 'Please enter a 6-digit verification code',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await customerAuthAPI.verifyOTP(
        formData.phoneOrEmail,
        formData.verificationCode
      );

      if (response.success) {
        setUserId(response.userId);
        toast({
          title: 'Verified!',
          description: 'Your phone/email has been verified',
        });
        setStep(3);
      } else {
        toast({
          title: 'Verification failed',
          description: response.error || 'Invalid verification code',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    try {
      const response = await customerAuthAPI.resendOTP(formData.phoneOrEmail);
      
      if (response.success) {
        startResendTimer();
        toast({
          title: 'Code resent',
          description: 'A new verification code has been sent',
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to resend code',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend code',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Submit = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast({
        title: 'Required fields',
        description: 'Please enter your first and last name',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await customerAuthAPI.savePersonalDetails(
        formData.phoneOrEmail,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          preferredName: formData.preferredName
        }
      );

      if (response.success) {
        setUserId(response.userId);
        setStep(4);
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to save personal details',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save personal details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStep4Submit = () => {
    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      toast({
        title: 'Invalid password',
        description: passwordValidation.message,
        variant: 'destructive',
      });
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are the same',
        variant: 'destructive',
      });
      return;
    }

    setStep(5);
  };

  const handleStep5Submit = async () => {
    if (!formData.location.address.trim()) {
      toast({
        title: 'Address required',
        description: 'Please enter your address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await customerAuthAPI.saveLocation(
        formData.phoneOrEmail,
        {
          latitude: formData.location.latitude || 0,
          longitude: formData.location.longitude || 0,
          address: formData.location.address,
          city: formData.location.city,
          state: formData.location.state,
          country: formData.location.country
        }
      );

      if (response.success) {
        setUserId(response.userId);
        setStep(6);
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to save location',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save location',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStep6Submit = async () => {
    if (!formData.agreeToTerms) {
      toast({
        title: 'Terms required',
        description: 'Please agree to the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await customerAuthAPI.completeRegistration(
        formData.phoneOrEmail,
        {
          preferences: formData.preferences,
          marketingOptIn: formData.agreeToTerms,
          password: formData.password
        }
      );

      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        toast({
          title: 'Registration complete!',
          description: 'Welcome to Zolu!',
        });
        
        if (!response.user.hasSpunWheel && userId) {
          setShowWheel(true);
        } else {
          router.push('/dashboard');
        }
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to complete registration',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to complete registration',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrizeWheelComplete = (prize: any) => {
    toast({
      title: 'Congratulations!',
      description: `You won: ${prize.name}`,
    });
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (showWheel && userId) {
    return <PrizeWheel onComplete={handlePrizeWheelComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          {step === 1 ? (
            <Link href="/get-started">
              <Button variant="ghost">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={loading}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
                {registrationMethod === 'phone' && (
                  <p className="text-sm text-gray-500">
                    We&apos;ll send a one-time code to verify your number
                  </p>
                )}
              </div>

              <Button
                onClick={handleStep1Submit}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Continue'
                )}
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
                  Verify Your {registrationMethod === 'phone' ? 'Number' : 'Email'}
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
                  onChange={(e) => handleInputChange('verificationCode', e.target.value.replace(/\D/g, ''))}
                  disabled={loading}
                />
                <p className="text-center text-sm text-gray-500">
                  Didn&apos;t receive it?{' '}
                  <button 
                    onClick={handleResendOTP}
                    className="font-semibold text-emerald-600 disabled:text-gray-400"
                    disabled={resendTimer > 0 || loading}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend now'}
                  </button>
                </p>
              </div>

              <Button
                onClick={handleStep2Submit}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                disabled={loading || formData.verificationCode.length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Continue'
                )}
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
                  <Label>First Name *</Label>
                  <Input
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Name (Optional)</Label>
                <Input
                  placeholder="What should we call you?"
                  value={formData.preferredName}
                  onChange={(e) => handleInputChange('preferredName', e.target.value)}
                  disabled={loading}
                />
                <p className="text-sm text-gray-500">
                  We&apos;ll use this name in our communications
                </p>
              </div>

              <Button
                onClick={handleStep3Submit}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                disabled={loading || !formData.firstName.trim() || !formData.lastName.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Continue'
                )}
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
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Create Your Password
      </h1>
      <p className="text-gray-600">Secure your account with a strong password</p>
    </div>

    <div className="space-y-2">
      <Label>Password *</Label>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <Label>Confirm Password *</Label>
      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
        <p className="text-xs text-red-600">Passwords do not match</p>
      )}
    </div>

    <div className="rounded-lg bg-gray-50 p-4">
      <p className="mb-2 text-sm font-semibold text-gray-700">Password requirements:</p>
      <ul className="space-y-1 text-xs text-gray-600">
        <li className={formData.password.length >= 8 ? 'text-emerald-600' : ''}>
          • At least 8 characters long
        </li>
        <li className={/[A-Z]/.test(formData.password) ? 'text-emerald-600' : ''}>
          • One uppercase letter
        </li>
        <li className={/[a-z]/.test(formData.password) ? 'text-emerald-600' : ''}>
          • One lowercase letter
        </li>
        <li className={/[0-9]/.test(formData.password) ? 'text-emerald-600' : ''}>
          • One number
        </li>
      </ul>
    </div>

    <Button
      onClick={handleStep4Submit}
      className="w-full bg-emerald-600 hover:bg-emerald-700"
      size="lg"
      disabled={
        loading || 
        !formData.password.trim() || 
        !formData.confirmPassword.trim() ||
        formData.password !== formData.confirmPassword ||
        formData.password.length < 8
      }
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        'Continue'
      )}
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
                  onClick={getCurrentLocation}
                  disabled={locationLoading || loading}
                >
                  {locationLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  <span>Use Current Location</span>
                </Button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Zolu uses your location to show nearby markets. You can change this
                  anytime.
                </p>
              </div>

              <div className="text-center text-sm text-gray-500">Or enter address manually</div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Address *</Label>
                  <Input
                    placeholder="e.g., 123 Main Street, Lekki Phase 1"
                    value={formData.location.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, address: e.target.value }
                    })}
                    disabled={loading}
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      placeholder="Lagos"
                      value={formData.location.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        location: { ...formData.location, city: e.target.value }
                      })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input
                      placeholder="Lagos State"
                      value={formData.location.state}
                      onChange={(e) => setFormData({
                        ...formData,
                        location: { ...formData.location, state: e.target.value }
                      })}
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    placeholder="Nigeria"
                    value={formData.location.country}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, country: e.target.value }
                    })}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                onClick={handleStep5Submit}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                disabled={loading || !formData.location.address.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
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
                      disabled={loading}
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
                  disabled={loading}
                />
                <div className="text-sm">
                  <span className="text-gray-600">
                    I&apos;d like to receive updates about special offers, new products,
                    and market news
                  </span>
                </div>
              </label>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-800">Terms of Service</p>
                    <p className="text-xs text-amber-700">
                      By completing registration, you agree to our{' '}
                      <a href="/terms" className="font-medium underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="font-medium underline">
                        Privacy Policy
                      </a>
                      . You also consent to receive marketing communications from Zolu.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStep6Submit}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                disabled={loading || !formData.agreeToTerms}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}