
'use client';
import React from "react";

const stages = ["in_progress", "trial", "arraignment", "bail"];

interface CardsProps {
  cases: any[];
  lawyers: any[];
}


const Cards = ({ cases, lawyers }:CardsProps) => {
  const verifiedLawyersCount = lawyers.length;
  const totalApplications = cases.length;
  const casesInProgress = cases.filter(
    caseItem => caseItem.status === "accepted" && stages.includes(caseItem.stage)
  ).length;
  const completedCases = cases.filter(
    caseItem => caseItem.status === "accepted" && caseItem.stage === "completed"
  ).length;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-[#621616] text-white p-5 rounded-lg text-center">
        <p className="text-sm opacity-90">Total Applications</p>
        <p className="text-3xl font-bold mt-1">{totalApplications}</p>
      </div>
      <div className="bg-[#621616] text-white p-5 rounded-lg text-center">
        <p className="text-sm opacity-90">Active Lawyers</p>
        <p className="text-3xl font-bold mt-1">{verifiedLawyersCount}</p>
      </div>
      <div className="bg-[#621616] text-white p-5 rounded-lg text-center">
        <p className="text-sm opacity-90">Cases in progress</p>
        <p className="text-3xl font-bold mt-1">{casesInProgress}</p>
      </div>
      <div className="bg-[#621616] text-white p-5 rounded-lg text-center">
        <p className="text-sm opacity-90">Completed</p>
        <p className="text-3xl font-bold mt-1">{completedCases}</p>
      </div>
    </div>
  );
};

export default Cards;