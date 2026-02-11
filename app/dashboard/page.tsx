'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Wallet,
  Eye,
  EyeOff,
  Gift,
  Ticket,
  User,
  ChevronRight,
  Lock,
  CheckCircle2,
  Loader2,
  LogOut,
  Settings,
  DollarSign,
  Package,
  Percent,
  Truck,
  Copy,
  Check,
  Edit,
  X,
  MapPin,
  Mail,
  Phone,
  UserCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { rewardsAPI, profileAPI  } from '@/lib/api/customer-auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phone: string;
  location?: {
    type?: string;
    coordinates?: number[];
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
  preferences?: string[];
  hasSpunWheel?: boolean;
  prizeWon?: {
    id?: number;
    name: string;
    type: string;
    value: number;
    currency?: string;
    description?: string;
    couponCode?: string;
    redeemed?: boolean;
  };
  marketingOptIn?: boolean;
}

interface EditFormData {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const [generatingCoupon, setGeneratingCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponsRemaining, setCouponsRemaining] = useState(4);
  const [copiedPrizeCoupon, setCopiedPrizeCoupon] = useState(false);
  const [copiedLaunchCoupon, setCopiedLaunchCoupon] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    firstName: '',
    lastName: '',
    preferredName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      toast({
        title: 'Not authenticated',
        description: 'Please log in to view your dashboard',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setUserData(user);
      console.log('User data loaded:', user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router, toast]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    router.push('/');
  };

  const handleOpenEditModal = () => {
    if (!userData) return;
    
    setEditFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      preferredName: userData.preferredName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.location?.address || '',
      city: userData.location?.city || '',
      state: userData.location?.state || '',
      country: userData.location?.country || '',
      postalCode: userData.location?.postal_code || '',
    });
    setIsEditModalOpen(true);
  };

 const handleSaveProfile = async () => {
  setIsSaving(true);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Error',
        description: 'Please log in again',
        variant: 'destructive',
      });
      return;
    }

    const response = await fetch('http://localhost:3000/api/v1/auth/customer/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        preferredName: editFormData.preferredName,
        email: editFormData.email,
        phone: editFormData.phone,
        location: {
          address: editFormData.address,
          city: editFormData.city,
          state: editFormData.state,
          country: editFormData.country,
          postal_code: editFormData.postalCode,
        },
      }),
    });

    // Get the raw response text first
    const responseText = await response.text();

    // Try to parse it as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response was:', responseText);
      toast({
        title: 'Error',
        description: 'Server returned invalid response',
        variant: 'destructive',
      });
      return;
    }

    if (data.success) {
      // Update local storage and state with the data from server
      const updatedUser = {
        ...userData,
        ...data.user, // Use the user data returned from the server
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser as UserData);
      setIsEditModalOpen(false);
      
      toast({
        title: '✅ Success!',
        description: data.message || 'Your profile has been updated successfully',
        className: 'bg-emerald-50 border-emerald-200',
        duration: 100000, 
      });
    } else {
      toast({
        title: 'Update Failed',
        description: data.error || 'Failed to update profile',
        variant: 'destructive',
      });
    }
  } catch (error) {
    console.error('Profile update error:', error);
    toast({
      title: 'Connection Error',
      description: error instanceof Error ? error.message : 'Failed to connect to server',
      variant: 'destructive',
    });
  } finally {
    setIsSaving(false);
  }
};

  const getPrizeIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <DollarSign className="h-6 w-6 text-yellow-500" />;
      case 'discount':
        return <Percent className="h-6 w-6 text-red-500" />;
      case 'free_delivery':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'product':
        return <Package className="h-6 w-6 text-orange-500" />;
      default:
        return <Gift className="h-6 w-6 text-emerald-500" />;
    }
  };

  const formatPrizeValue = (prize: UserData['prizeWon']) => {
    if (!prize) return '';
    
    switch (prize.type) {
      case 'credit':
        return `${prize.currency || '₦'}${prize.value}`;
      case 'discount':
        return `${prize.value}% OFF`;
      case 'free_delivery':
        return 'Free Delivery';
      case 'product':
        return prize.name;
      default:
        return prize.name;
    }
  };

  const formatPrizeDescription = (prize: UserData['prizeWon']) => {
    if (!prize) return '';
    
    switch (prize.type) {
      case 'credit':
        return 'Wallet credit';
      case 'discount':
        return 'Discount coupon';
      case 'free_delivery':
        return 'On your next order';
      case 'product':
        return 'Product reward';
      default:
        return 'Prize';
    }
  };

  const handleRedeemPrize = async () => {
    if (!userData?.prizeWon) return;
    
    setRedeeming(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Error',
          description: 'Please log in again',
          variant: 'destructive',
        });
        return;
      }

      const response = await rewardsAPI.redeemPrize(token);
      
      if (response.success) {
        toast({
          title: 'Prize Redeemed!',
          description: response.message,
        });
        
        // Update local storage
        const updatedUser = {
          ...userData,
          prizeWon: response.couponCode ? {
            ...userData.prizeWon,
            couponCode: response.couponCode,
            redeemed: true
          } : undefined
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
        
        if (response.couponCode) {
          setCouponCode(response.couponCode);
        }
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to redeem prize',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to redeem prize',
        variant: 'destructive',
      });
    } finally {
      setRedeeming(false);
    }
  };

  const handleGenerateLaunchCoupon = async () => {
    setGeneratingCoupon(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Error',
          description: 'Please log in again',
          variant: 'destructive',
        });
        return;
      }

      const response = await rewardsAPI.generateLaunchCoupon(token);
      
      if (response.success) {
        setCouponCode(response.couponCode);
        setCouponsRemaining(response.remainingCoupons);
        
        toast({
          title: 'Coupon Generated!',
          description: `You have ${response.remainingCoupons} coupons remaining`,
        });
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to generate coupon',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate coupon',
        variant: 'destructive',
      });
    } finally {
      setGeneratingCoupon(false);
    }
  };

  const copyCouponCode = async () => {
    if (!couponCode) {
      toast({
        title: 'No coupon code',
        description: 'Please generate a coupon first',
        variant: 'destructive',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(couponCode);
      setCopiedLaunchCoupon(true);
      toast({
        title: 'Copied!',
        description: 'Coupon code copied to clipboard',
      });
      setTimeout(() => setCopiedLaunchCoupon(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy coupon code',
        variant: 'destructive',
      });
    }
  };

  const copyPrizeCouponCode = async () => {
    const prizeCoupon = userData?.prizeWon?.couponCode;
    
    if (!prizeCoupon) {
      toast({
        title: 'No coupon code',
        description: 'Please redeem your prize first',
        variant: 'destructive',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(prizeCoupon);
      setCopiedPrizeCoupon(true);
      toast({
        title: 'Copied!',
        description: 'Prize coupon code copied to clipboard',
      });
      setTimeout(() => setCopiedPrizeCoupon(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy coupon code',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const displayName = userData.preferredName || userData.firstName;
  const fullName = `${userData.firstName} ${userData.lastName}`;
  const locationText = userData.location?.city && userData.location?.state
    ? `${userData.location.city}, ${userData.location.state}`
    : userData.location?.address || 'Not provided';

  return (
    <>
      <div className="space-y-8 pb-8">
        {/* Header with Logout */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your account and rewards</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Welcome back, {displayName}! 👋</h2>
          <p className="mt-2 text-emerald-100">
            Here's what's happening with your account today
          </p>
          {userData.preferences && userData.preferences.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {userData.preferences.map((pref, index) => (
                <span
                  key={index}
                  className="rounded-full bg-emerald-500 bg-opacity-30 px-3 py-1 text-xs font-medium text-white"
                >
                  {pref}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Zolu Wallet */}
        <Card className="overflow-hidden rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Wallet className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Zolu wallet</h2>
                  <p className="text-sm text-gray-500">Your rewards balance</p>
                </div>
              </div>
              <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
                {isBalanceVisible ? (
                  <Eye className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-4xl font-bold text-gray-900">
                {isBalanceVisible ? '₦0' : '******'}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Start shopping to earn rewards!
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Withdrawable</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-800">
                  {isBalanceVisible ? '₦0' : '******'}
                </p>
              </div>
              <div className="rounded-xl bg-gray-100 p-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>Pending</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-800">
                  {isBalanceVisible ? '₦0' : '******'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spin Rewards - Show if user has spun the wheel */}
        {userData.hasSpunWheel && userData.prizeWon && (
          <Card className="overflow-hidden rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Gift className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Spin Rewards</h2>
                  <p className="text-sm text-gray-500">Your winnings from Spin-to-Win</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-white p-2">
                      {getPrizeIcon(userData.prizeWon.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{userData.prizeWon.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrizeDescription(userData.prizeWon)}
                      </p>
                      {userData.prizeWon.couponCode && (
                        <div className="mt-2 flex items-center gap-2">
                          <code className="rounded bg-emerald-100 px-2 py-1 text-xs font-mono text-emerald-700">
                            {userData.prizeWon.couponCode}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={copyPrizeCouponCode}
                            className="h-6 px-2"
                          >
                            {copiedPrizeCoupon ? (
                              <Check className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">
                      {formatPrizeValue(userData.prizeWon)}
                    </p>
                    {!userData.prizeWon.redeemed ? (
                      <Button
                        size="sm"
                        onClick={handleRedeemPrize}
                        disabled={redeeming}
                        className="mt-2 bg-emerald-600 hover:bg-emerald-700"
                      >
                        {redeeming ? (
                          <>
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Redeeming...
                          </>
                        ) : (
                          'Redeem Now'
                        )}
                      </Button>
                    ) : (
                      <p className="text-xs font-medium text-emerald-500">Redeemed ✓</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Coupons */}
        <Card className="overflow-hidden rounded-2xl bg-emerald-50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-white p-3">
                <Ticket className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Launch Offer</h2>
                <p className="text-sm text-gray-500">Exclusive discount for early users</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-white p-4">
                <div>
                  <p className="text-3xl font-bold text-emerald-600">60% OFF</p>
                  <p className="text-sm text-gray-500">
                    Valid for first 4 orders within 90 days of launch
                  </p>
                  <p className="mt-2 text-xs font-semibold text-emerald-700">
                    {couponsRemaining} coupons remaining
                  </p>
                </div>
                <Button 
                  className="bg-emerald-600 font-semibold hover:bg-emerald-700"
                  onClick={handleGenerateLaunchCoupon}
                  disabled={generatingCoupon || couponsRemaining === 0}
                >
                  {generatingCoupon ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Coupon'
                  )}
                </Button>
              </div>
              
              {couponCode && (
                <div className="rounded-xl bg-white p-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">Your Coupon Code:</p>
                  <div className="flex items-center justify-between gap-2 rounded-lg bg-gray-100 p-3">
                    <code className="flex-1 font-mono text-sm font-bold text-gray-900">
                      {couponCode}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyCouponCode}
                      className="h-8 shrink-0 px-3"
                    >
                      {copiedLaunchCoupon ? (
                        <>
                          <Check className="mr-1 h-4 w-4 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1 h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Use this code at checkout to get 60% off
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="overflow-hidden rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Account Information
                  </h2>
                  <p className="text-sm text-gray-500">Your profile details</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenEditModal}
                className="hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-6 divide-y divide-gray-200">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-800">{fullName}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              {userData.preferredName && (
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm text-gray-500">Preferred Name</p>
                    <p className="font-semibold text-gray-800">{userData.preferredName}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              )}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-semibold text-gray-800">{userData.phone}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{userData.email}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-800">{locationText}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <UserCircle className="h-6 w-6 text-emerald-600" />
              Edit Profile
            </DialogTitle>
            <DialogDescription>
              Update your personal information and location details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <User className="h-4 w-4 text-emerald-600" />
                Personal Information
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={editFormData.firstName}
                    onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                    placeholder="Enter first name"
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={editFormData.lastName}
                    onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                    placeholder="Enter last name"
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredName">Preferred Name (Optional)</Label>
                <Input
                  id="preferredName"
                  value={editFormData.preferredName}
                  onChange={(e) => setEditFormData({ ...editFormData, preferredName: e.target.value })}
                  placeholder="How should we call you?"
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Phone className="h-4 w-4 text-emerald-600" />
                Contact Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  placeholder="08012345678"
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="pl-10 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Location Details
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  placeholder="Enter your street address"
                  rows={2}
                  className="resize-none focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={editFormData.city}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    placeholder="Enter city"
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={editFormData.state}
                    onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                    placeholder="Enter state"
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={editFormData.country}
                    onChange={(e) => setEditFormData({ ...editFormData, country: e.target.value })}
                    placeholder="Enter country"
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={editFormData.postalCode}
                    onChange={(e) => setEditFormData({ ...editFormData, postalCode: e.target.value })}
                    placeholder="Enter postal code"
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}