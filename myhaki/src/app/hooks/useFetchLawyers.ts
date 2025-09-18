'use client'
import { useState, useEffect } from "react";
import { fetchLawyers } from "../utils/fetchLawyers";

export interface Lawyer {
  id: number;
  first_name: string;
  last_name: string;
  verified: boolean | null;
  cpd_points_2025?: number | null;
}

const useFetchLawyers = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchLawyers();

        // const verifiedLawyers = Array.isArray(data)
        //   ? data.filter((lawyer) => lawyer.verified === true)
        //   : [];
        // setLawyers(verifiedLawyers);
        const allLawyers = Array.isArray(data) ? data : [];
        setLawyers(allLawyers);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { lawyers, loading, error };
};

export default useFetchLawyers;
