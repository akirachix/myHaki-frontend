import { Suspense } from 'react';
import VerifyOtpPage from './verifyOtpClient';

export default function VerifyOtp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPage />
    </Suspense>
  );
}