"use client"

import OnboardingModal from '@/components/onboard'
import React from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter();

    const handleClose = () => {
        router.push('/dashboard');
    };
  return (
    <div>
        <OnboardingModal onClose={handleClose}/>
    </div>
  )
}

export default Page