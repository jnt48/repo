"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Step = "welcome" | "customize" | "tutorial" | "summary";

export default function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("welcome");
  const [username, setUsername] = useState<string>("");

  const nextStep = () => {
    if (step === "welcome") setStep("customize");
    else if (step === "customize") setStep("tutorial");
    else if (step === "tutorial") setStep("summary");
    else if (step === "summary") onClose(); // Close modal on finish
  };

  const prevStep = () => {
    if (step === "summary") setStep("tutorial");
    else if (step === "tutorial") setStep("customize");
    else if (step === "customize") setStep("welcome");
  };

  const stepContent = {
    welcome: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Coding Adventure!</h2>
        <p className="mb-6">
          Embark on a journey to master programming through interactive challenges and fun missions.
        </p>
      </div>
    ),
    customize: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Customize Your Profile</h2>
        <p className="mb-6">
          Choose your avatar, set a nickname, and let your personality shine!
        </p>
        <input 
          type="text" 
          placeholder="Enter your username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="border border-gray-300 p-2 rounded w-full max-w-xs mx-auto"
        />
      </div>
    ),
    tutorial: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Quick Tutorial</h2>
        <p className="mb-6">
          Get a quick walkthrough of our platform&apos;s features and learn how to tackle your first challenge.
        </p>
      </div>
    ),
    summary: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">All Set!</h2>
        <p className="mb-6">
          You’ve completed the onboarding. Get ready to dive into your coding journey.
        </p>
      </div>
    )
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <AnimatePresence>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {stepContent[step]}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-between">
          {step !== "welcome" && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {step === "summary" ? (
            <Link href={`/auth/signup?username=${encodeURIComponent(username)}`}>
              <button className="font-pixel text-lg sm:text-xl md:text-2xl bg-violet-600 text-background px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-md hover:bg-purple-500 transition-colors duration-150 hover:text-white shadow-md">
                Sign Up
              </button>
            </Link>
          ) : (
            <button
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}