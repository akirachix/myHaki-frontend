'use client';
import React from 'react';
import CaseTable from './components/Cases-Table';
import CaseStatusBar from "./components/Case-Status-Bar";
import SidebarWithLogo from '../shared-components/page';
import Image from 'next/image';


export default function CasesPage() {
  return (
    
    <div className="min-h-screen bg-white lg:flex">
        <SidebarWithLogo />
      <main className="flex-1 px-4 md:px-8 py-8">
        <CaseStatusBar />
      </main>
</div>

  );
}
