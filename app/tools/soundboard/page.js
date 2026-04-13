"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Volume2 } from "lucide-react";
import Soundboard from "@/components/arbeitskarte/Soundboard";

export default function SoundboardPage() {
  return (
    <div className="ak-page">
      <div className="ak-container">
        {/* Hero Banner */}
        <div className="ak-hero">
          <div className="ak-hero-inner">
            <div>
              <div className="ak-hero-badge">Digitales Werkzeug</div>
              <h1 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Volume2 size={28} />
                Soundboard – Alarmtöne
              </h1>
              <p>
                Alle THITRONIK Signaltöne zum Anhören und Identifizieren.
                Ideal für Schulungen, Kundeneinweisungen und den schnellen Funktionsvergleich vor Ort.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginBottom: "var(--sp-6)" }}>
          <Link href="/dashboard" className="btn btn-back">
            <ArrowLeft size={16} /> Zurück zum Dashboard
          </Link>
        </div>

        {/* Soundboard Component */}
        <Soundboard />
      </div>
    </div>
  );
}
