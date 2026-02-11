'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/navbar';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP, 3: New Password
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      toast({
        title: 'Required field',
        description: 'Please enter your email or phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      const response = await fetch(`${API_BASE}/auth/customer/forgot-password/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.identifier,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'OTP sent!',
          description: 'Check your email or phone for the verification code',
        });
        startResendTimer();
        setStep(2);
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to send OTP',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reset code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      toast({
        title: 'Invalid code',
        description: 'Please enter the 6-digit verification code',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      const response = await fetch(`${API_BASE}/auth/customer/forgot-password/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          code: formData.otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Verified!',
          description: 'Now create your new password',
        });
        setStep(3);
      } else {
        toast({
          title: 'Verification failed',
          description: data.error || 'Invalid code',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword.length < 8) {
      toast({
        title: 'Weak password',
        description: 'Password must be at least 8 characters long',
        variant: 'destructive',
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are the same',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      const response = await fetch(`${API_BASE}/auth/customer/forgot-password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          code: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Password reset!',
          description: 'You can now login with your new password',
        });
        router.push('/login');
      } else {
        toast({
          title: 'Reset failed',
          description: data.error || 'Failed to reset password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reset password. Please try again.',
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
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      const response = await fetch(`${API_BASE}/auth/customer/forgot-password/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.identifier,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Code resent!',
          description: 'A new verification code has been sent',
        });
        startResendTimer();
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to resend code',
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8">
            {/* Step 1: Enter Email/Phone */}
            {step === 1 && (
              <>
                <div className="mb-8">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                  <h1 className="mt-4 text-3xl font-bold text-gray-900">
                    Forgot Password?
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Enter your email or phone number to receive a reset code
                  </p>
                </div>

                <form onSubmit={handleStep1Submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="identifier">Email or Phone Number</Label>
                    <Input
                      id="identifier"
                      type="text"
                      placeholder="you@example.com or 07012345678"
                      value={formData.identifier}
                      onChange={(e) =>
                        setFormData({ ...formData, identifier: e.target.value })
                      }
                      disabled={loading}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending code...
                      </>
                    ) : (
                      'Send Reset Code'
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* Step 2: Verify OTP */}
            {step === 2 && (
              <>
                <div className="mb-8">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Change email/phone
                  </button>
                  <h1 className="mt-4 text-3xl font-bold text-gray-900">
                    Verify Code
                  </h1>
                  <p className="mt-2 text-gray-600">
                    We sent a 6-digit code to{' '}
                    <span className="font-semibold">{formData.identifier}</span>
                  </p>
                </div>

                <form onSubmit={handleStep2Submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })
                      }
                      disabled={loading}
                      required
                    />
                    <p className="text-center text-sm text-gray-500">
                      Didn&apos;t receive it?{' '}
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="font-semibold text-emerald-600 disabled:text-gray-400"
                        disabled={resendTimer > 0 || loading}
                      >
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend now'}
                      </button>
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    disabled={loading || formData.otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* Step 3: Set New Password */}
            {step === 3 && (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Create New Password
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Your new password must be different from previously used passwords
                  </p>
                </div>

                <form onSubmit={handleStep3Submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, newPassword: e.target.value })
                        }
                        disabled={loading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        disabled={loading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword &&
                      formData.newPassword !== formData.confirmPassword && (
                        <p className="text-xs text-red-600">Passwords do not match</p>
                      )}
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700">
                      Password requirements:
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li
                        className={
                          formData.newPassword.length >= 8 ? 'text-emerald-600' : ''
                        }
                      >
                        • At least 8 characters long
                      </li>
                      <li
                        className={
                          /[A-Z]/.test(formData.newPassword) ? 'text-emerald-600' : ''
                        }
                      >
                        • One uppercase letter
                      </li>
                      <li
                        className={
                          /[a-z]/.test(formData.newPassword) ? 'text-emerald-600' : ''
                        }
                      >
                        • One lowercase letter
                      </li>
                      <li
                        className={
                          /[0-9]/.test(formData.newPassword) ? 'text-emerald-600' : ''
                        }
                      >
                        • One number
                      </li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    disabled={
                      loading ||
                      !formData.newPassword ||
                      !formData.confirmPassword ||
                      formData.newPassword !== formData.confirmPassword ||
                      formData.newPassword.length < 8
                    }
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}