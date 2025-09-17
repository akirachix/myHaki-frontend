'use client';

import Image from "next/image";
import CaseTable from '../Cases-Table';
import useFetchCases from '@/app/hooks/useFetchCases'; 

export default function CaseStatusBar() {
  const { cases, loading } = useFetchCases(); 

  const totalCases = cases.length;

  return (
    <div className="min-h-screen bg-white lg:flex relative">
      <div className="absolute top-4 right-4 z-10">
        <Image src="/images/notification-icon.png" alt="Notifications" width={24} height={24} />
      </div>
      
      <main className="flex-1 px-4 md:px-8 py-8 ">
        <h1 className="text-3xl text-red-900 font-bold mb-6">Case overview</h1>
        <Image src="/images/case-overview.png" alt="Case Overview Banner" width={1200} height={200} className=" h-[23%] mb-6 rounded-lg shadow-md [@media(width:1024px)]:ml-[-5%] [@media(width:2560px)]:w-400" />
        <CaseTable />
      </main>

      <aside className="w-full overflow-x-hidden lg:w-1/4 px-4 py-40 flex flex-row lg:flex-col gap-6 lg:gap-10 
                        lg:sticky lg:top-0 [@media(width:1024px)]:ml-[-7%] [@media(width:1024px)]:mt-[-4%]">
        
        <div className="bg-[#b8906e] [@media(width:1024px)]:w-33 h-20 text-white rounded-lg mb-10 mt-[-20%] px-6 py-4 flex-1 flex flex-col items-center text-center [@media(width:1366px)]:mt-[-30%] [@media(width:1280px)]:mt-[-33%]">
          {loading ? (
            <span className="mt-8 text-5xl [@media(width:1024px)]:text-[120%] font-bold">...</span>
          ) : (
            <span className="mt-8 text-5xl [@media(width:1024px)]:text-[120%] font-bold">
              {totalCases.toLocaleString()} 
            </span>
          )}
          <span className="mt-2 mb-14">Total Cases</span>
          <div className="w-full flex justify-center mt-2">
            <div className="flex gap-1">
              <Image src="/images/case-level.png" alt="CPD Points" width={270} height={20} className='mb-6' />
            </div>
          </div>
          <span className="mt-2 text-[120%]">78% cases completed</span>
        </div>

        <div className="bg-[#b8906e] [@media(width:1024px)]:w-33 text-white rounded-lg px-6 py-15 text-center flex flex-col items-center min-w-[100px]">
          <Image src="/images/First Place Ribbon.png" alt="CPD Points" width={110} height={100} className="mb-5" />
          <span className="font-regular text-[120%]">CPD points per case</span>
        </div>
      </aside>
    </div>
  );
}