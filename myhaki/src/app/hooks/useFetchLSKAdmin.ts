'use client'
import { useState, useEffect } from "react";
import { fetchLSKAdmin } from "../utils/fetchLSKAdmin";
import { LSKAdmin } from "../utils/type";


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