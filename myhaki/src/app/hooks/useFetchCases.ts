'use client';
import { useState, useEffect } from 'react';
import { fetchCases } from '../utils/fetchCases';

export interface CaseItem {
  case_id: number;
  detainee: number;
  lawyer_id: number | null; 
  case_type: string | null; 
  detainee_details: {
    detainee_id: number;
    first_name: string;
    last_name: string;
    id_number: string;
    gender: string;
    date_of_birth: string;
    relation_to_applicant: string;
    created_at: string;
    updated_at: string;
    user: number | null;
  };
  predicted_case_type: string;
  predicted_urgency_level: string;
  case_description: string;
  date_of_offense: string;
  trial_date: string;
  police_station: string;
  latitude: string;
  longitude: string;
  income_source: string;
  monthly_income: string;
  dependents: any;
  stage: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const useFetchCases = () => {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCases();
        setCases(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { cases, loading, error };
};

export default useFetchCases;