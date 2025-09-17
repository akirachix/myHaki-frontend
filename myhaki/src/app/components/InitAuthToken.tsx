'use client';

import { useEffect } from 'react';
import { setAuthToken } from '@/app/utils/authToken';

const FIXED_TOKEN = '7b4b2cb877e5bbe2ad4dbe3b65cb5ae6bbc56788';

export default function InitAuthToken() {
  useEffect(() => {
    const existingToken = document.cookie.includes('auth_token');
    if (!existingToken) {
      setAuthToken(FIXED_TOKEN);
      console.log('✅ Auth token set in cookies');
    }
  }, []);

  return null; 
}