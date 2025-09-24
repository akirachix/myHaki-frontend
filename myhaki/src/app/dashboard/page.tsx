'use client'
import React, { useState } from "react";
import Cards from "./components/Cards";
import CaseDistribution from "./components/CaseDistribution";
import CaseTrends from "./components/CaseTrends";
import Rank from "./components/Rank";
import CalendarPopup from "./components/Calendar";
import useFetchCases from "@/app/hooks/useFetchCases";
import { useFetchVerifiedLawyers } from "../hooks/useFetchLawyers";
import useFetchCPDPoints from "@/app/hooks/useFetchCPDPoints";
import useFetchLSKAdmin from "../hooks/useFetchLSKAdmin";
import Layout from "../shared-components/Layout";
const filterByMonth = (list: any[], date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const prefix = `${year}-${month}`;
  return list.filter(item => item.updated_at && item.updated_at.startsWith(prefix));
};
export default function DashboardPage() {
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const { cases, loading: casesLoading } = useFetchCases();
  const { lawyers, loading: lawyersLoading } = useFetchVerifiedLawyers();
  const { cpdRecords, loading: cpdLoading } = useFetchCPDPoints();
  const { admins, loading: adminsLoading } = useFetchLSKAdmin();
  const isLoading = casesLoading || lawyersLoading || cpdLoading || adminsLoading;
  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-screen bg-gray-50">
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#621616] mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your dashboard...</p>
            </div>
          </main>
        </div>
      </Layout>
    );
  }
  const verifiedLawyers = lawyers.filter(lawyer => {
    if (typeof lawyer.verified === "boolean") return lawyer.verified;
    return false;
  });
  const filteredCases = filterByMonth(cases || [], filterDate);
  const filteredLawyers = filterByMonth(verifiedLawyers, filterDate);
  const filteredCPDPoints = filterByMonth(cpdRecords || [], filterDate);
  let adminUser = null;
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem('userId');
    if (userId && admins && admins.length > 0) {
      adminUser = admins.find(admin => String(admin.id) === String(userId));
    }
  }
  const adminName = adminUser ? `${adminUser.first_name} ${adminUser.last_name}` : "Admin";
  return (
    <Layout>
      <div className="flex h-screen bg-gray-50">
        <main className="flex-1 overflow-auto bg-gray-50">
          <header className="bg-white shadow-sm p-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">Hello, {adminName}</h2>
            </div>
            <div className="flex items-center space-x-4 text-[#621616] cursor-pointer">
              <CalendarPopup value={filterDate} onChange={setFilterDate} />
            </div>
          </header>
          <Cards cases={filteredCases} lawyers={filteredLawyers} />
          <div className="p-6">
            <CaseDistribution cases={filteredCases} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-pink-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">CPD Points Rank</h3>
                <Rank lawyers={filteredLawyers} cpdPoints={filteredCPDPoints} />
              </div>
              <div className="bg-pink-100 p-6 rounded-lg flex flex-col">
                <h3 className="text-xl font-semibold mb-4">Case Trends</h3>
                <CaseTrends cases={filteredCases} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}






