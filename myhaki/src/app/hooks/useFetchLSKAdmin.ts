'use client'
import { useState, useEffect } from "react";
import { fetchLSKAdmin } from "../utils/fetchLSKAdmin";

export interface LSKAdmin {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  role?: string;
}

const useFetchLSKAdmin = () => {
  const [admins, setAdmins] = useState<LSKAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchLSKAdmin();
        const allAdmins = Array.isArray(data) ? data : [];
        setAdmins(allAdmins);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { admins, loading, error };
};

export default useFetchLSKAdmin;