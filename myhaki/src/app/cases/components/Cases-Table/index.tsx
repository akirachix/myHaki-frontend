'use client';
import { useState, ChangeEvent } from "react";
import useFetchCases from "@/app/hooks/useFetchCases";
import { CaseItem } from "@/app/utils/type";
import CaseDetailModal from "../Case-Detail-Modal";
import LoadingSpinner from "@/app/shared-components/LoadingSpinner";

interface FetchCasesResult {
  cases: CaseItem[];
  loading: boolean;
  error: string | null;
}

function normalizeStatus(status: string): string {
  return status.toLowerCase().replace(/[\s-]+/g, '');
}

function getStatusClasses(status: string): string {
  const coloredStatus = normalizeStatus(status || '');
  switch (coloredStatus) {
    case 'pending':
      return 'bg-red-100 text-red-700 border border-red-200';
    case 'accepted':
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'assigned':
      return 'bg-orange-100 text-orange-700 border border-orange-200';
    case 'closed':
      return 'bg-green-100 text-green-700 border border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
}


export default function CaseTable() {
  const { cases, loading, error } = useFetchCases() as FetchCasesResult;
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const itemsPerPage = 4;

  if (loading) return <LoadingSpinner text="Loading cases..." className="py-12" />;
  if (error) return <div className="text-[#B8906E] text-center py-12">Error: {error}</div>;

  const sortedCases = [...cases].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  let filteredCases = sortedCases;

  // Apply date range filters
  if (startDateFilter || endDateFilter) {
    filteredCases = filteredCases.filter(caseItem => {
      const caseDate = new Date(caseItem.created_at);
      const start = startDateFilter ? new Date(startDateFilter) : new Date('1900-01-01');
      const end = endDateFilter ? new Date(endDateFilter) : new Date('2100-12-31');
      caseDate.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return caseDate >= start && caseDate <= end;
    });
  }

  // Search filter (includes assigned lawyer name, detainee, case type)
  if (searchTerm.trim()) {
    filteredCases = filteredCases.filter((caseItem) => {
      const lawyerName = caseItem.assigned_lawyer_details
        ? `${caseItem.assigned_lawyer_details.first_name} ${caseItem.assigned_lawyer_details.last_name}`.toLowerCase()
        : '';

      const detaineeName = caseItem.detainee_details
        ? `${caseItem.detainee_details.first_name} ${caseItem.detainee_details.last_name}`.toLowerCase()
        : '';

      const caseType = (caseItem.predicted_case_type || '').toLowerCase();

      return (
        lawyerName.includes(searchTerm.toLowerCase()) ||
        detaineeName.includes(searchTerm.toLowerCase()) ||
        caseType.includes(searchTerm.toLowerCase())
      );
    });
  }

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = (): void => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = (): void => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const handleClear = (): void => {
    setSearchTerm('');
    setStartDateFilter('');
    setEndDateFilter('');
    setCurrentPage(1);
  };

  const getLawyerName = (caseItem: CaseItem): string => {
    if (caseItem.assigned_lawyer_details) {
      const { first_name, last_name } = caseItem.assigned_lawyer_details;
      return `${first_name} ${last_name}`;
    }
    return 'Unassigned';
  };

  return (
    <div className="bg-white rounded-2xl mb-3 shadow-xl p-6 overflow-hidden -mt-7">
      {/* Search + Filters */}
      <div className="mb-1">
        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
            <input
              type="text"
              placeholder="Search by case type, lawyer name, or detainee name..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8906E] w-full sm:w-84"
            />
            {(searchTerm || startDateFilter || endDateFilter) && (
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-[#B8906E] text-white rounded-md hover:bg-[#A58265] transition-colors text-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Date Range</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDateFilter}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8906E] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDateFilter}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8906E] text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-[#F1C08B] to-[#E8B07A]">
            <tr className="font-bold">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider rounded-tl-xl">Lawyer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider">Detainee</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider">Case Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentCases.length > 0 ? (
              currentCases.map((caseItem) => (
                <tr
                  key={caseItem.case_id}
                  className="group hover:bg-gradient-to-r from-gray-50 to-gray-25 transition-all duration-200 cursor-pointer border-b hover:border-b border-gray-200"
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800">
                    {getLawyerName(caseItem)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                    {caseItem.detainee_details?.first_name || 'Unknown'} {caseItem.detainee_details?.last_name || ''}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                    {caseItem.case_type || caseItem.predicted_case_type || 'Unfiltered'}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusClasses(caseItem.status)}`}>
                      {caseItem.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">No cases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button onClick={handlePrev} disabled={currentPage === 1} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#B8906E] text-white hover:bg-[#A58265] shadow-md hover:shadow-lg'}`}>
            ← Previous
          </button>
          <div className="text-sm text-gray-600">Page {currentPage} of {totalPages}</div>
          <button onClick={handleNext} disabled={currentPage === totalPages} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#B8906E] text-white hover:bg-[#A58265] shadow-md hover:shadow-lg'}`}>
            Next →
          </button>
        </div>
      )}

      {selectedCase && (
        <CaseDetailModal
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
}
