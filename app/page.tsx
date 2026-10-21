"use client";

import React, { useState } from "react";
import { MinimalNav } from "@/components/landing/MinimalNav";
import { OpeningScene } from "@/components/landing/OpeningScene";
import { RevealStory } from "@/components/landing/RevealStory";
import { RequestTicker } from "@/components/landing/RequestTicker";
import { ProcessFlow } from "@/components/landing/ProcessFlow";
import { RequestExperience } from "@/components/landing/RequestExperience";
import { FinalCta } from "@/components/landing/FinalCta";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { RequestModal } from "@/components/request/RequestModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialPrompt, setModalInitialPrompt] = useState<string>("");
  // Remounts the modal per open so each request starts from a clean state.
  const [modalSession, setModalSession] = useState(0);

  const handleOpenModalWithPrompt = (prompt: string) => {
    setModalInitialPrompt(prompt);
    setModalSession((session) => session + 1);
    setIsModalOpen(true);
  };

  const handleOpenModalEmpty = () => {
    handleOpenModalWithPrompt("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink font-sans text-paper">
      <RevealObserver />

      <MinimalNav onOpenRequest={handleOpenModalEmpty} />

      <main id="main" className="flex-1">
        <OpeningScene onOpenRequest={handleOpenModalEmpty} />
        <RevealStory />
        <RequestTicker onSelectPrompt={handleOpenModalWithPrompt} />
        <ProcessFlow />
        <RequestExperience onSubmitRequest={handleOpenModalWithPrompt} />
        <FinalCta onOpenRequest={handleOpenModalEmpty} />
      </main>

      <SiteFooter />

      {isModalOpen ? (
        <RequestModal
          key={modalSession}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialPrompt={modalInitialPrompt}
        />
      ) : null}
    </div>
  );
}
