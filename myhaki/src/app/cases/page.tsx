'use client';
import React from 'react';
import CaseStatusBar from './components/Case-Status-Bar';
import Layout from '../shared-components/Layout';


export default function Cases() {
  return (
    
    <div className='h-screen overflow-hidden'>
       <Layout>
      <main className="flex-1 px-4 md:px-8 py-8 overflow-hidden">
        <CaseStatusBar />
      </main>
      </Layout>
</div>

  );
}
