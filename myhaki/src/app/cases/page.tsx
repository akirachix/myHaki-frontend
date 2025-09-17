'use client';
import React from 'react';
import CaseStatusBar from "./components/Case-Status-Bar";
import Sidebar from '../shared-components/SideBar';
import Image from 'next/image';


export default function CasesPage() {
  return (
    
    <div className="min-h-screen bg-white lg:flex">
        <Sidebar />
      <main className="flex-1 px-4 md:px-8 py-8">
        <CaseStatusBar />
      </main>
</div>

  );
}
