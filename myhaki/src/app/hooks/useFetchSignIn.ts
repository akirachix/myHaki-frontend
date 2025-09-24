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

      setAuthToken(data.token);

      localStorage.setItem('userId', data.id.toString());

      return data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { signin, loading, error };
}









