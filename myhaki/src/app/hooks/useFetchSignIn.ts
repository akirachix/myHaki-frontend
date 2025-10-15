'use client';
import { useState } from 'react';
import { fetchSignin } from '../utils/fetchSignin';
import { setAuthToken } from '../utils/authToken';

export default function useFetchSignin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signin(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSignin(email, password);

      const isAdmin = (data.role && data.role === 'lsk_admin') ||
                      (data.roles && Array.isArray(data.roles) && data.roles.includes('lsk_admin'));

      if (!isAdmin) {
        throw new Error('Unauthorized: user is not an lsk_admin');
      }

      setAuthToken(data.token);
      localStorage.setItem('userId', data.id.toString());
      return data;
    } catch (error) {
      const errorMsg = (error as Error).message;
      setError(errorMsg);
      throw error; 
    } finally {
      setLoading(false);
    }
  }

  return { signin, loading, error };
}
