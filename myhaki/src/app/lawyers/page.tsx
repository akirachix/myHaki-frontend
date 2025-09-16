'use client';

import { useState, useMemo } from 'react';
import { useFetchLawyers } from "../hooks/useFetchLawyers";
import SidebarWithLogo from '../shared-components/page';

export default function LawyersPage() {
  const { lawyers, loading } = useFetchLawyers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filterVerified, setFilterVerified] = useState<string>("all"); 
  const itemsPerPage = 7;

  const filteredLawyers = useMemo(() => {
    let result = lawyers;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(lawyer =>
        lawyer.first_name.toLowerCase().includes(query) ||
        lawyer.last_name.toLowerCase().includes(query)
      );
    }

    if (filterVerified === "true") {
      result = result.filter(lawyer => lawyer.verified === true);
    } else if (filterVerified === "false") {
      result = result.filter(lawyer => !lawyer.verified); 
    }

    return result;
  }, [lawyers, searchQuery, filterVerified]);

  function getRoles(lawyer: any) {
    const roles: string[] = [];
    if (lawyer.criminal_law) roles.push("Criminal law");
    if (lawyer.constitutional_law) roles.push("Constitutional law");
    if (lawyer.corporate_law) roles.push("Corporate law");
    if (lawyer.family_law) roles.push("Family law");
    if (lawyer.pro_bono_legal_services) roles.push("Pro bono services");
    if (lawyer.alternative_dispute_resolution) roles.push("ADR");
    if (lawyer.regional_and_international_law)
      roles.push("Regional & International law");
    if (lawyer.mining_law) roles.push("Mining law");

    return roles.length > 0 ? roles.join(", ") : "General practice";
  }

  if (loading) return <p className="text-center mt-4">Loading lawyers...</p>;

  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLawyers = filteredLawyers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterVerified(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="shrink-0">
        <SidebarWithLogo />
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <h1 className="mt-15 text-2xl md:text-3xl font-bold text-red-900 mb-6 md:mb-8 tracking-tight">
          Lawyers
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8906e] focus:border-[#b8906e] outline-none transition shadow-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600"
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
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="w-full sm:w-48 text-gray-700">
            <select
              value={filterVerified}
              onChange={handleFilterChange}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8906e] focus:border-[#b8906e] outline-none transition shadow-sm"
            >
              <option value="all">All Lawyers</option>
              <option value="true">Verified</option>
              <option value="false">Unverified</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#b8906e]">
                <tr>
                  <th scope="col" className="px-4 py-3.5 text-left text-[100%] font-bold text-white uppercase tracking-wider">
                    Lawyer
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-[100%] font-bold text-white uppercase tracking-wider w-1/3">
                    Role
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-[100%] font-bold text-white uppercase tracking-wider">
                    CPD
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-[100%] font-bold text-white uppercase tracking-wider">
                    Workplace
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentLawyers.length > 0 ? (
                  currentLawyers.map((lawyer) => (
                    <tr
                      key={lawyer.id}
                      className="hover:bg-amber-50 transition-colors border border-gray-200 duration-150 ease-in-out group"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 font-medium text-[100%] mr-2.5">
                            {lawyer.first_name[0]}
                            {lawyer.last_name[0]}
                          </div>
                          <span className="text-gray-900 font-medium text-[100%] group-hover:text-[#b8906e] transition-colors">
                            {lawyer.first_name} {lawyer.last_name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-gray-700 text-[100%]">
                        <div className="max-w-xs truncate md:max-w-none md:whitespace-normal">
                          {getRoles(lawyer)}
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[100%] font-medium bg-amber-100 text-amber-800">
                          {lawyer.cpd_points_2025} pts
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-gray-600 text-[100%]">
                        {lawyer.work_place || <span className="text-gray-400 italic">N/A</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-gray-500 text-sm">
                      No lawyers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 px-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center gap-1.5 px-5 py-1.5 rounded-xl text-[90%] font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#b8906e] text-white hover:bg-[#a58265] shadow-sm'
                }`}
              >
                ← Previous
              </button>

              <div className="text-xs text-gray-600">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#b8906e] text-white hover:bg-[#a58265] shadow-sm'
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}