'use client';
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const caseTypes = [
  "Environment",
  "Civil",
  "Employment",
  "Family",
  "Constitutional",
  "Criminal",
  "Commercial",
  "Property",
  "Human rights",
  "Other"
];

const stages = ["in_progress", "trial", "arraignment", "bail"];

interface CaseDistributionProps {
  cases: any[];
}

export default function CaseDistribution({ cases }: CaseDistributionProps) {
  const distribution = caseTypes.map(type => {
    const completed = cases.filter(
      caseItem => 
        caseItem.predicted_case_type === type.toLowerCase() && 
        caseItem.status === "accepted" && 
        caseItem.stage === "completed"
    ).length;

    const active = cases.filter(
      caseItem =>
        caseItem.predicted_case_type === type.toLowerCase() &&
        caseItem.status === "accepted" &&
        stages.includes(caseItem.stage)
    ).length;

    return { name: type, Active: active, Completed: completed };
  });

  return (
    <div className="bg-pink-100 p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Case Distribution</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={distribution}>
          <CartesianGrid strokeDasharray="0 1" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
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
          <Legend />
          <Bar
            dataKey="Active"
            stackId="a"
            fill="#621616"
            name="Active"
            onClick={() => {}}

          />
          <Bar
            dataKey="Completed"
            stackId="a"
            fill="#BE939B"
            name="Completed"
            radius={[10, 10, 0, 0]} 
            onClick={() => {}}

          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}



