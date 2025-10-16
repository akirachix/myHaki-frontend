
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import useFetchLawyers from "../hooks/useFetchLawyers";
import useFetchCases from "../hooks/useFetchCases";
import Sidebar from '../shared-components/SideBar';
import Image from "next/image";
import { Lawyer, FilterOption } from '../utils/type';
import { FaCheckCircle } from 'react-icons/fa';

const TypedSelect = dynamic(
  () => import('react-select').then(mod => {
    const TypedComponent: React.ComponentType<
      React.ComponentProps<typeof mod.default<FilterOption, false>>
    > = mod.default;
    return TypedComponent;
  }),
  { ssr: false }
);

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'All Lawyers' },
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: '#B8906E',
    boxShadow: 'none',
    '&:hover': { borderColor: '#A97D5D' },
    borderRadius: 8,
    minHeight: '38px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#B8906E' : 'white',
    color: state.isFocused ? 'white' : '#4C0D0D',
    cursor: 'pointer',
  }),
  singleValue: (provided: any) => ({ ...provided, color: '#4C0D0D' }),
  dropdownIndicator: (provided: any) => ({ ...provided, color: '#B8906E' }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 8,
    overflow: 'hidden',
  }),
};

function StatsCards({
  verifiedLawyersCount,
  completedCasesCount,
}: {
  verifiedLawyersCount: number;
  completedCasesCount: number;
}) {
  return (
    <div className="flex flex-col gap-5 sticky top-4 lg:mt-30 [@media(width:1024px)]:mt-32 [@media(width:1280px)]:mt-32">
      <div className="bg-[#B8906E] rounded-xl w-64 h-60 p-10 flex flex-col items-center justify-center text-white shadow-md [@media(width:1024px)]:w-40 [@media(width:1024px)]:-ml-6">
        <p className="text-lg font-semibold mb-1 text-center">Total Active Lawyers</p>
        <p className="text-4xl font-bold mb-2">{verifiedLawyersCount}</p>
        <div className="w-8 h-8">
          <Image
            src="/images/totalsales.png"
            alt="Active Lawyers Icon"
            width={60}
            height={60}
          />
        </div>
      </div>
      <div className="bg-[#B8906E] rounded-xl w-64 h-70 p-10 flex flex-col items-center justify-center text-white shadow-md [@media(width:1024px)]:w-40 [@media(width:1024px)]:-ml-6">
        <p className="text-lg font-semibold mb-1 text-center">Total Completed Cases</p>
        <p className="text-4xl font-bold mb-2">{completedCasesCount}</p>
        <div className="w-8 h-8">
          <Image
            src="/images/upwardtrend.png"
            alt="Workplace Icon"
            width={60}
            height={60}
          />
        </div>
      </div>
    </div>
  );
}

export default function LawyersPage() {
  const { lawyers, loading: lawyersLoading } = useFetchLawyers();
  const { cases, loading: casesLoading } = useFetchCases();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerified, setFilterVerified] = useState<string>('all');

  const itemsPerPage = 6;
  const isLoading = lawyersLoading || casesLoading;

  const stats = useMemo(() => {
    const verifiedLawyersCount = Array.isArray(lawyers)
      ? lawyers.filter((lawyer) => lawyer.verified === true).length
      : 0;

    const completedCasesCount = Array.isArray(cases)
      ? cases.filter((c) => c.status?.toLowerCase() === 'closed').length
      : 0;

    return { verifiedLawyersCount, completedCasesCount };
  }, [lawyers, cases]);

  const filteredLawyers = useMemo(() => {
    let result: Lawyer[] = Array.isArray(lawyers) ? lawyers : [];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (lawyer) =>
          lawyer.first_name.toLowerCase().includes(query) ||
          lawyer.last_name.toLowerCase().includes(query)
      );
    }
    if (filterVerified === 'true') result = result.filter((l) => l.verified);
    else if (filterVerified === 'false') result = result.filter((l) => !l.verified);
    return result;
  }, [lawyers, searchQuery, filterVerified]);

  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
  const currentLawyers = filteredLawyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="flex bg-[#FFF8F4] min-h-screen">
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex gap-10 p-8 overflow-hidden">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-[#4C0D0D] mb-6">
            List of Lawyers
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6  items-start sm:items-center">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search lawyer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-[#B8906E] rounded-full bg-white text-[#4C0D0D] focus:ring-2 focus:ring-[#B8906E] outline-none"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B8906E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="w-48 ">
              <TypedSelect
                options={filterOptions}
                styles={customStyles}
                placeholder="Filter by status"
                value={filterOptions.find((o) => o.value === filterVerified)}
                onChange={(selected) => setFilterVerified(selected?.value || 'all')}
                isSearchable={false}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-[#E6D6C3] overflow-hidden [@media(width:1024px)]:w-135 ">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#B8906E] mx-auto mb-4"></div>
                  <p className="text-[#4C0D0D] text-lg font-medium">
                    Loading lawyers...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <table className="min-w-full divide-y shadow-2xl divide-[#E6D6C3] text-sm">
                  <thead className="bg-[#B8906E] text-white">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Lawyer</th>
                      <th className="px-6 py-3 text-left font-semibold">Law Field</th>
                      <th className="px-6 py-3 text-left font-semibold">CPD Points</th>
                      <th className="px-6 py-3 text-left font-semibold">Workplace</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6D6C3] shadow-2xs">
                    {currentLawyers.length > 0 ? (
                      currentLawyers.map((lawyer: Lawyer) => (
                        <tr
                          key={lawyer.id}
                          className="hover:bg-[#FFF3EA] transition duration-200"
                        >
                          <td className="px-6 py-3 font-medium text-[#4C0D0D] flex items-center gap-2">
                            {lawyer.first_name} {lawyer.last_name}
                            {lawyer.verified && (
                              <FaCheckCircle className="text-green-600 w-4 h-4" />
                            )}
                          </td>
                          <td className="px-6 py-3 text-[#4C0D0D] capitalize">
                            {lawyer.criminal_law
                              ? 'Criminal Lawyer'
                              : lawyer.constitutional_law
                                ? 'Constitutional Lawyer'
                                : lawyer.regional_and_international_law
                                  ? 'Human Rights Lawyer'
                                  : 'General Practice'}
                          </td>
                          <td className="px-6 py-3 text-[#4C0D0D]">
                            {lawyer.cpd_points_2025}
                          </td>
                          <td className="px-6 py-3 text-[#4C0D0D]">
                            {lawyer.work_place || '—'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-[#4C0D0D]">
                          No lawyers found.
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>

                {totalPages > 1 && (
                  <div className="flex justify-between items-center py-4 px-6 bg-white">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className={`px-6 py-2 rounded-full font-medium ${currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#B8906E] text-white hover:bg-[#A97D5D]'
                        }`}
                    >
                      ← Previous
                    </button>
                    <p className="text-[#4C0D0D] text-sm">
                      Page {currentPage} of {totalPages}
                    </p>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`px-6 py-2 rounded-full font-medium ${currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#B8906E] text-white hover:bg-[#A97D5D]'
                        }`}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <StatsCards
          verifiedLawyersCount={stats.verifiedLawyersCount}
          completedCasesCount={stats.completedCasesCount}
        />
      </div>
    </div>
  );
}
