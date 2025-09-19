'use client'
import { useState, useEffect } from "react";
import { fetchCPDPoints } from "../utils/fetchCPDPoints";
import { CPDRecord } from "../utils/type";


const useFetchCPDPoints = () => {
  const [cpdRecords, setcpdRecords] = useState<CPDRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCPDPoints();
        const transactions = Array.isArray(data) ? data : data.results || [];
        setcpdRecords(transactions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { cpdRecords, loading, error };
};

export default useFetchCPDPoints;