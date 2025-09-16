interface CaseDetailModalProps {
  caseItem: any;
  onClose: () => void;
}

export default function CaseDetailModal({ caseItem, onClose }: CaseDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 text-black flex justify-center items-center z-40">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-[35%] relative">
        <button 
          className="absolute top-4 right-4 text-[#b8906e] font-bold" 
          onClick={onClose}
        >X</button>
        <h2 className="text-2xl font-bold mb-4">Case Details</h2>
        <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm">
          <div className="font-semibold">Case-Code:</div> <div>{caseItem.case_id ?? "N/A"}</div>
          <div className="font-semibold">Client Name:</div> <div>{caseItem.detainee_details?.first_name} {caseItem.detainee_details?.last_name}</div>
          <div className="font-semibold">Start Date:</div> <div>{caseItem.created_at?.slice(0,10)}</div>
          <div className="font-semibold">Station address:</div> <div>{caseItem.police_station}</div>
          <div className="font-semibold">Client Age:</div> <div>{caseItem.detainee_details ? (new Date().getFullYear() - new Date(caseItem.detainee_details.date_of_birth).getFullYear()) : 'N/A'} years</div>
          <div className="font-semibold">Case type:</div> <div>{caseItem.predicted_case_type}</div>
          <div className="font-semibold">Trial Date:</div> <div>{caseItem.trial_date}</div>
          <div className="font-semibold">Contact:</div> <div>{caseItem.detainee_details?.id_number ?? 'N/A'}</div>
          <div className="font-semibold ">Case Status:</div> <div className="">{caseItem.status}</div>
          <div className="font-semibold">Case Stage:</div> <div>{caseItem.stage}</div>
          <div className="font-semibold">Assigned Lawyer:</div> <div>{caseItem.lawyer_first_name ?? 'N/A'}</div>
          <div className="font-semibold">Law Field:</div> <div>{"Human right lawyer"}</div>
          <div className="font-semibold">P105-Number:</div> <div>{caseItem.lawyer_profile_id ?? 'lsk/2025'}</div>
          <div className="font-semibold">Location:</div> <div>{caseItem.location ?? "Karen/korongo"}</div>
          <div className="font-semibold">CPD Points:</div> <div>{caseItem.cpd_points ?? 3}</div>
        </div>
      </div>
    </div>
  );
}
