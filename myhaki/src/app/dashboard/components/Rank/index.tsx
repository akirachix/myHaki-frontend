'use client';
import React from 'react';
import Image from 'next/image';
import { FaCrown } from 'react-icons/fa';

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

interface RankProps {
  lawyers: Lawyer[];
}

const Rank = ({ lawyers }: RankProps) => {
  const sortedLawyers = [...lawyers]
    .sort((a, b) => b.cpd_points_2025 - a.cpd_points_2025)
    .slice(0, 3);

  const topThree = [
    sortedLawyers[0] || { first_name: 'N/A', last_name: '', cpd_points_2025: 0 },
    sortedLawyers[1] || { first_name: 'N/A', last_name: '', cpd_points_2025: 0 },
    sortedLawyers[2] || { first_name: 'N/A', last_name: '', cpd_points_2025: 0 },
  ];

  const positions = [
    {
      label: "2nd Place",
      img: "/images/two.png",
      crownColor: "text-gray-400",
      width: 80,
      height: 80,
      textClass: "text-xs",
      crownSize: "text-xs",
      mb: "",
      index: 1,
    },
    {
      label: "1st Place",
      img: "/images/one.png",
      crownColor: "text-orange-500",
      width: 110,
      height: 110,
      textClass: "text-sm",
      crownSize: "text-sm",
      mb: "mb-2",
      index: 0,
    },
    {
      label: "3rd Place",
      img: "/images/three.png",
      crownColor: "text-yellow-400",
      width: 80,
      height: 80,
      textClass: "text-xs",
      crownSize: "text-xs",
      mb: "",
      index: 2,
    },
  ];

  return (
    <div className="bg-pink-100 p-4 rounded-lg w-full max-w-md mx-auto">
      <div className="flex flex-row items-end justify-center gap-x-4">
        {positions.map((position) => {
          const lawyer = topThree[position.index];
          return (
            <div
              key={position.label}
              className={`text-center flex-1 flex flex-col items-center ${position.mb}`}
            >
              <div className="relative flex justify-center">
                <Image
                  src={position.img}
                  alt={position.label}
                  width={position.width}
                  height={position.height}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <FaCrown
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 ${position.crownColor} ${position.crownSize}`}
                />
              </div>
              <p className={`${position.textClass} mt-1 font-medium`}>
                {lawyer.first_name} {lawyer.last_name}
              </p>
              <p className="text-[10px] text-gray-600">
                {lawyer.cpd_points_2025 ?? 0} pts
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rank;