'use client';
import Image from "next/image";
import CaseTable from "../Cases-Table";
import useFetchCases from '@/app/hooks/useFetchCases';
import LoadingSpinner from "@/app/shared-components/LoadingSpinner";
import { CaseItem } from "@/app/utils/type";

// Type for the return value of useFetchCases hook
interface FetchCasesResult {
  cases: CaseItem[];
  loading: boolean;
  error: string | null;
}

// Type for CPD data aggregation
interface CPDData {
  [key: string]: number;
}

export default function CaseStatusBar() {
  const { cases, loading } = useFetchCases() as FetchCasesResult;
  const totalCases = cases.length;
  
  const inProgressCases = cases.filter(caseItem => caseItem.stage === 'in_progress').length;
  const inProgressPercentage = totalCases > 0 ? Math.round((inProgressCases / totalCases) * 100) : 0;
  
  const getCPDPointsPerMonth = (): CPDData => {
    if (!cases || cases.length === 0) return {};
    
    const cpdData: CPDData = {};
    
    cases.forEach(caseItem => {
      const date = new Date(caseItem.created_at);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
      
      // Assuming each case is worth 1 CPD point unless specified otherwise.
      // Adjust this if your API provides a specific CPD value per case.
      const cpdPoints = 1; 
      
      if (!cpdData[monthKey]) {
        cpdData[monthKey] = 0;
      }
      cpdData[monthKey] += cpdPoints;
    });
    
    return cpdData;
  };
  
  const cpdData = getCPDPointsPerMonth();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthCPD = cpdData[currentMonth] || 0;

  return (
    <div className="min-h h-screen bg-white lg:flex relative">
      <main className="flex-1 px-4 [@media(width:1024px)]:ml-[-5%] md:px-8 py-8">
        <h1 className="text-3xl text-red-900 font-bold mb-6">Case overview</h1>
        <Image
          src="/images/case-overview.png"
          alt="Case Overview Banner"
          width={1200}
          height={200}
          className="h-[23%] mb-6 rounded-lg shadow-md [@media(width:1024px)]:ml-[-4%] [@media(width:2560px)]:w-400"
        />
        <CaseTable />
      </main>

      <aside className="w-full lg:w-1/4 px-4 py-40 flex flex-row lg:flex-col gap-6 lg:gap-10 lg:sticky lg:top-0 [@media(width:1024px)]:ml-[-2%] [@media(width:1024px)]:mt-[-4%]">
        
        <div className="bg-[#b8906e] [@media(width:1024px)]:w-33 [@media(width:1366px)]:w-56 [@media(width:1366px)]:h-79 text-white rounded-lg mb-10 mt-[-20%] px-8 py-4 flex-1 flex flex-col items-center text-center [@media(width:1512px)]:mt-[-27%] [@media(width:1366px)]:mt-[-30%] [@media(width:1280px)]:h-79 [@media(width:1280px)]:mt-[-33%] [@media(width:1024px)]:ml-[-20%] [@media(width:1024px)]:h-[75%]">
          {loading ? (
            <LoadingSpinner size="h-8 w-8" text="" />
          ) : (
            <>
              <span className="mt-8 text-5xl [@media(width:1024px)]:text-[120%] font-bold">
                {inProgressPercentage}%
              </span>
              <span className="mt-2 mb-14">Cases in progress</span>
              <div className="w-full flex justify-center mt-2">
                <div className="flex gap-1">
                  <Image
                    src="/images/case-level.png"
                    alt="Case Progress"
                    width={270}
                    height={20}
                    className="mb-6 [@media(width:1024px)]:mb-[-5%] [@media(width:1024px)]:mt-[-30%]"
                  />
                </div>
              </div>
              <span className="mt-2 text-[120%] [@media(width:1024px)]:text-[70%] [@media(width:1366px)]:text-[115%]">
                {inProgressCases} of {totalCases} cases are in progress
              </span>
            </>
          )}
        </div>

        <div className="bg-[#B8906E] [@media(width:1024px)]:w-31 text-white rounded-lg px-6 py-15 [@media(width:1366px)]:h-68 [@media(width:1512px)]:h-70 [@media(width:1366px)]:py-10 [@media(width:1366px)]:w-56 [@media(width:1280px)]:h-66 [@media(width:1024px)]: h-48 2xl:h-80 [@media(width:1024px)]:mt-[-32%] [@media(width:1024px)]:ml-[-15%] text-center flex flex-col items-center min-w-[100px]">
          <Image
            src="/images/First Place Ribbon.png"
            alt="CPD Points"
            width={110}
            height={100}
            className="mb-5"
          />
          {loading ? (
            <LoadingSpinner size="h-8 w-8" text="" />
          ) : (
            <>
              <span className="font-bold text-2xl mb-2">{currentMonthCPD}</span>
              <span className="font-regular [@media(width:1366px)]:text-[105%] [@media(width:1024px)]:text-[60%] text-[120%]">
                CPD points this month
              </span>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}