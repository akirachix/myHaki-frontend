export interface Lawyer {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    role: string;
    phone_number: string | null;
    image: string | null;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    profile_id: string;
    verified: boolean;
    practising_status: string;
    work_place: string;
    physical_address: string;
    cpd_points_2025: number;
    criminal_law: boolean;
    constitutional_law: boolean;
    corporate_law: boolean;
    family_law: boolean;
    pro_bono_legal_services: boolean;
    alternative_dispute_resolution: boolean;
    regional_and_international_law: boolean;
    mining_law: boolean;
   }
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

   
   export interface LSKAdmin {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    role?: string;
  }


 export interface CPDRecord {
    cpd_id: number;
    lawyer: number; 
    points_earned: number;
    total_points:number;
  }
  
export interface Detainee {
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
}



export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  image?: string | null;
}