'use client';

import { useEffect } from 'react';
import { CaseItem } from '@/app/utils/type';

interface Dependents {
  count: number;
  description: string;
}

interface CaseDetailModalProps {
  caseItem: CaseItem;
  onClose: () => void;
}

export default function CaseDetailModal({ caseItem, onClose }: CaseDetailModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black/45 bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh]">
        <h2 className="text-2xl font-bold text-[#822727] mb-6">Case Details - Case ID: {caseItem.case_id}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Detainee Information</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Name:</span>{' '}
              {caseItem.detainee_details.first_name} {caseItem.detainee_details.last_name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">ID Number:</span> {caseItem.detainee_details.id_number || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Gender:</span>{' '}
              {caseItem.detainee_details.gender.charAt(0).toUpperCase() + caseItem.detainee_details.gender.slice(1)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Date of Birth:</span>{' '}
              {formatDate(caseItem.detainee_details.date_of_birth)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Relation to Applicant:</span>{' '}
              {caseItem.detainee_details.relation_to_applicant.charAt(0).toUpperCase() +
                caseItem.detainee_details.relation_to_applicant.slice(1) || 'N/A'}
            </p>
          </div>

          <div>
            <h3 className="text-lg  font-semibold text-gray-800 mb-3">Case Information</h3>
            <p className="text-sm mb-1.5 text-gray-600">
              <span className="font-medium">Case Type:</span>{' '}
              {caseItem.predicted_case_type.charAt(0).toUpperCase() + caseItem.predicted_case_type.slice(1) || 'N/A'}
            </p>
            <p className="text-sm mb-1.5 text-gray-600">
              <span className="font-medium">Urgency Level:</span>{' '}
              <span className={
                caseItem.predicted_urgency_level?.toLowerCase() === 'high' ? 'text-red-500 font-semibold' :
                  caseItem.predicted_urgency_level?.toLowerCase() === 'medium' ? 'text-blue-500 font-semibold' :
                    caseItem.predicted_urgency_level?.toLowerCase() === 'low' ? 'text-green-700 font-semibold' :
                      ''
              }>
                {caseItem.predicted_urgency_level
                  ? caseItem.predicted_urgency_level.charAt(0).toUpperCase() + caseItem.predicted_urgency_level.slice(1)
                  : 'N/A'}
              </span>
            </p>
            <p className="text-sm mb-1.5 text-gray-600">
              <span className="font-medium">Status:</span>{' '}
              <span
                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${caseItem.status.toLowerCase() === 'pending'
                  ? 'bg-red-800 text-red-100'
                  : caseItem.status.toLowerCase() === 'accepted'
                    ? 'bg-[#f1c08b] text-gray-600'
                    : caseItem.status.toLowerCase() === 'completed'
                      ? 'bg-green-600 text-green-100'
                      : caseItem.status.toLowerCase() === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {caseItem.status}
              </span>
            </p>
            <p className="text-sm mb-1.5 text-gray-600">
              <span className="font-medium">Stage:</span>{' '}
              {caseItem.stage.replace('_', ' ').charAt(0).toUpperCase() + caseItem.stage.replace('_', ' ').slice(1) || 'N/A'}
            </p>
            <p className="text-sm mb-1.5 text-gray-600">
              <span className="font-medium">Date of Offense:</span>{' '}
              {formatDate(caseItem.date_of_offense)}
            </p>
            <p className="text-sm mb-1.5 text-gray-600">
              <span className="font-medium">Trial Date:</span>{' '}
              {formatDate(caseItem.trial_date)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Case Description</h3>
          <p className="text-sm text-gray-600">
            {caseItem.case_description
              ? caseItem.case_description.charAt(0).toUpperCase() + caseItem.case_description.slice(1)
              : 'No description provided.'}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Location Information</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Police Station:</span> {caseItem.police_station || 'N/A'}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial Information</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Income Source:</span>{' '}
            {caseItem.income_source.charAt(0).toUpperCase() + caseItem.income_source.slice(1) || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Monthly Income:</span>{' '}
            {caseItem.monthly_income.replace('_', ' ').charAt(0).toUpperCase() +
              caseItem.monthly_income.replace('_', ' ').slice(1) || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Dependents:</span>{' '}
            {caseItem.dependents
              ? `${caseItem.dependents.count || 0} ${caseItem.dependents.description || ''}`.trim() || 'N/A'
              : 'N/A'}
          </p>
        </div>
        Property 'toString' does not exist on type 'never'.ts(2339)

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#b8906e] text-white rounded-md hover:bg-[#a58265] transition-colors shadow-sm cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}