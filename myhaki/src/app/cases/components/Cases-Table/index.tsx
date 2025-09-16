
'use client'
import { useState } from "react";
import useFetchCases from "@/app/hooks/useFetchCases";
import CaseDetailModal from "../Case-Detail-Modal";

export default function CaseTable() {
  const { cases, loading, error } = useFetchCases();
  const [selectedCase, setSelectedCase] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (loading) return <div className="flex justify-center py-12 text-gray-600">Loading cases...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  const sortedCases = [...cases].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const totalPages = Math.ceil(sortedCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCases = sortedCases.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-white rounded-2xl [@media(width:1024px)]:ml-[-10%] shadow-xl p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-red-900">Case Management</h2>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-[#f1c08b] to-[#e8b07a]">
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
              currentCases.map((caseItem: any) => (
                <tr
                  key={caseItem.case_id}
                  className="group hover:bg-gradient-to-r from-gray-50 to-gray-25 transition-all duration-200 cursor-pointer border-b border-transparent hover:border-b border-gray-200"
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800">
                    {caseItem.lawyer_first_name || 'Unassigned'}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                    {caseItem.detainee_details?.first_name || 'Unknown'} {caseItem.detainee_details?.last_name || ''}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                    {caseItem.predicted_case_type || caseItem.case_type || 'Unfiltered'}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                      caseItem.status === 'Accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : caseItem.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {caseItem.status}
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
                : 'bg-[#b8906e] text-white hover:bg-[#a58265] shadow-md hover:shadow-lg'
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
                : 'bg-[#b8906e] text-white hover:bg-[#a58265] shadow-md hover:shadow-lg'
            }`}
          >
            Next →
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedCase && (
        <CaseDetailModal
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
}