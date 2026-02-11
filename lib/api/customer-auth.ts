const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const customerAuthAPI = {
  startRegistration: async (identifier: string, type: 'phone' | 'email') => {
    const response = await fetch(`${API_BASE}/auth/customer/register/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, type })
    });
    return response.json();
  },

  verifyOTP: async (identifier: string, code: string) => {
    const response = await fetch(`${API_BASE}/auth/customer/register/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, code })
    });
    return response.json();
  },

  savePersonalDetails: async (identifier: string, data: {
    firstName: string;
    lastName: string;
    preferredName?: string;
  }) => {
    const response = await fetch(`${API_BASE}/auth/customer/register/personal-details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, ...data })
    });
    return response.json();
  },

  saveLocation: async (identifier: string, locationData: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  }) => {
    const response = await fetch(`${API_BASE}/auth/customer/register/location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, ...locationData })
    });
    return response.json();
  },

  completeRegistration: async (identifier: string, data: {
    preferences: string[];
    marketingOptIn: boolean;
    password: string;
  }) => {
    const response = await fetch(`${API_BASE}/auth/customer/register/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, ...data })
    });
    return response.json();
  },

  spinPrizeWheel: async (userId: string, token: string) => {
    const response = await fetch(`${API_BASE}/auth/customer/prize-wheel/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },

  resendOTP: async (identifier: string) => {
    const response = await fetch(`${API_BASE}/auth/customer/register/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier })
    });
    return response.json();
  },
};

//Rewards API
export const rewardsAPI = {
  redeemPrize: async (token: string) => {
    const response = await fetch(`${API_BASE}/rewards/prize/redeem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },

  generateLaunchCoupon: async (token: string) => {
    const response = await fetch(`${API_BASE}/rewards/coupon/launch/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },

  useLaunchCoupon: async (token: string, couponCode: string) => {
    const response = await fetch(`${API_BASE}/rewards/coupon/launch/use`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ couponCode })
    });
    return response.json();
  },
};

export const profileAPI = {
  updateProfile: async (
    token: string,
    data: {
      firstName: string;
      lastName: string;
      preferredName?: string;
      email: string;
      phone: string;
      location?: {
        address?: string;
        city?: string;
        state?: string;
        country?: string;
        postal_code?: string;
      };
    }
  ) => {
    const response = await fetch(`${API_BASE}/auth/customer/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};