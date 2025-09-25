'use client';
import { useState, useEffect } from "react";
import useFetchCases from "@/app/hooks/useFetchCases";
import { CaseItem } from "@/app/utils/type";
import useFetchLawyers from "@/app/hooks/useFetchLawyers";
import CaseDetailModal from "../Case-Detail-Modal";
function normalizeStatus(status: string): string {
  return status.toLowerCase().replace(/[\s-]+/g, '');
}
function getStatusClasses(status: string): string {
  const coloredStatus = normalizeStatus(status || '');
  switch (coloredStatus) {
    case 'pending':
      return 'bg-red-800 text-red-100';
    case 'accepted':
      return 'bg-[#F1C08B] text-gray-600';
    case 'completed':
      return 'bg-green-700 text-green-100';
    case 'inprogress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
export default function CaseTable() {
  const { cases, loading, error } = useFetchCases();
  const { lawyers, loading: lawyersLoading } = useFetchLawyers();
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4;
  if (loading || lawyersLoading) return <div className="flex justify-center py-12 text-gray-600">Loading cases...</div>;
  if (error) return <div className="text-[#B8906E] text-center py-12">Error: {error}</div>;
  const sortedCases = [...cases].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const filteredCases = searchTerm.trim()
    ? sortedCases.filter((caseItem) =>
        (caseItem.predicted_case_type ?? '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : sortedCases;
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handleClear = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };
  const getLawyerName = (lawyerId: number | null | undefined): string => {
    if (!lawyerId) return 'Unassigned';
    const lawyer = lawyers.find(l => l.id === lawyerId);
    return lawyer ? lawyer.first_name : 'Unassigned';
  };
  return (
    <div className="bg-white rounded-2xl [@media(width:1024px)]:ml-[-10%] shadow-xl p-6 overflow-hidden -mt-7">
      <div className="mb-1">
        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="text"
            placeholder="Search by case type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8906E] w-full sm:w-84"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-[#F1C08B] to-[#E8B07A]">
            <tr className="font-bold">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider rounded-tl-xl">
                Lawyer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider">
                Detainee
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider">
                Case Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#822727] uppercase tracking-wider rounded-tr-xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentCases.length > 0 ? (
              currentCases.map((caseItem: CaseItem) => (
                <tr
                  key={caseItem.case_id}
                  className="group hover:bg-gradient-to-r from-gray-50 to-gray-25 transition-all duration-200 cursor-pointer border-b hover:border-b border-gray-200"
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800">
                    {getLawyerName(caseItem.lawyer_id)}
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
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#B8906E] text-white hover:bg-[#A58265] shadow-md hover:shadow-lg'
            }`}
          >
            ← Previous
          </button>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#B8906E] text-white hover:bg-[#A58265] shadow-md hover:shadow-lg'
            }`}
          >
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
