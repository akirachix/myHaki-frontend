'use client';
import React from 'react';
import Image from 'next/image';
import { FaCrown } from 'react-icons/fa';

interface CPDRecord {
  lawyer: number | null;
  total_points: number;
}

interface Lawyer {
  id: number;
  first_name: string;
  last_name: string;
}

interface RankProps {
  cpdPoints: CPDRecord[];
  lawyers: Lawyer[];
}

const Rank = ({ cpdPoints, lawyers }: RankProps) => {
  const lawyerPoints: Record<number, number> = {};

  cpdPoints.forEach((cpdRecord) => {
    if (cpdRecord.lawyer == null) return;
    const lawyerId = cpdRecord.lawyer + 1;
    if (
      lawyerPoints[lawyerId] === undefined ||
      cpdRecord.total_points > lawyerPoints[lawyerId]
    ) {
      lawyerPoints[lawyerId] = cpdRecord.total_points;
    }
  });

  const lawyerTotals = lawyers.map((lawyer) => {
    const lawyerId = lawyer.id;
    return {
      id: lawyerId,
      name: `${lawyer.first_name} ${lawyer.last_name}`,
      total_cpd_points: lawyerPoints[lawyerId] ?? 0,
    };
  });

  const sortedLawyers = lawyerTotals.sort(
    (a, b) => b.total_cpd_points - a.total_cpd_points
  );
  const topThree = [
    sortedLawyers[0] || { name: 'N/A', total_cpd_points: 0 },
    sortedLawyers[1] || { name: 'N/A', total_cpd_points: 0 },
    sortedLawyers[2] || { name: 'N/A', total_cpd_points: 0 },
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
        {positions.map((position) => (
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
              {topThree[position.index]?.name || 'N/A'}
            </p>
            <p className="text-[10px] text-gray-600">
              {topThree[position.index]?.total_cpd_points ?? 0} pts
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rank;