'use client';
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const stages = [
  { key: "in_progress", label: "In Progress", color: "#621616" },
  { key: "trial", label: "Trial", color: "#7F3A3A" },
  { key: "arraignment", label: "Arraignment", color: "#B88683" },
  { key: "bail", label: "Bail", color: "#D9A5A5" },
  { key: "completed", label: "Completed", color: "#F1CCCC" },
];

interface PieItem {
  color: string;
  value: string; 
}

function Legend({ pieItems }: { pieItems: PieItem[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col items-start gap-1">
      {pieItems.map((pieItem) => (
        <li key={pieItem.value} className="flex items-center gap-1">
          <span
            className="inline-block w-3 xl:ml-[-65px] h-3 rounded-full"
            style={{ backgroundColor: pieItem.color }}
          />
          <span className="text-sm xl:text-xl text-[#621616] ">{pieItem.value}</span>
        </li>
      ))}
    </ul>
  );
}

interface Case {
  stage: string;
}


interface CaseTrendsProps {
  cases: Case[];
}

export default function CaseTrends({ cases }: CaseTrendsProps) {
  const pieData = stages.map(stage => ({
    name: stage.label,
    value: cases.filter(caseItem => caseItem.stage === stage.key).length,
    color: stage.color
  }));

  const hasNoCases = pieData.every(pieItem => pieItem.value === 0);

  return (
    <div className="w-full h-80 flex flex-col items-center justify-center p-4 bg-pink-50 rounded-lg shadow-sm">
      {hasNoCases ? (
        <div className="flex flex-col items-center justify-center w-full h-full text-center p-6">
          <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-gray-500 text-sm font-medium">No case trends available in this period.</p>
        </div>
      ) : (
        <>
          <div className="relative lg:mt-25 2xl:mt-[-20px] w-full h-full flex 2xl:ml-30">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  onClick={() => {}}
                >
                  {pieData.map((pieItem, index) => (
                    <Cell key={`cell-${index}`} fill={pieItem.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '8px 12px',
                    fontSize: '12px',
                    color: '#333',}}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute lg:top-[-95px] 2xl:top-4 left-4">
              <Legend
                pieItems={pieData.filter(pieItem => pieItem.value > 0).map(d => ({
                  color: d.color,
                  value: d.name
                }))}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}