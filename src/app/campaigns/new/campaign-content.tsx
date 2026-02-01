"use client";

import { useState } from "react";
import { CampaignSidebar, sections } from "./campaign-sidebar";
import { useSidenavCollapsed } from "~/components/sidenav";

export function CampaignContent() {
  const [selectedSection, setSelectedSection] = useState("idea");
  const isSidenavCollapsed = useSidenavCollapsed();

  const currentSection = sections.find((s) => s.id === selectedSection);

  return (
    <div className="flex min-h-screen">
      {/* Secondary sidebar panel */}
      <aside
        className={`fixed top-0 h-screen w-80 border-r border-gray-200 bg-gray-50 transition-all duration-300 ${
          isSidenavCollapsed ? "left-16" : "left-64"
        }`}
      >
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Create new campaign
          </h1>
        </div>
        <CampaignSidebar
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />
      </aside>

      {/* Main content area */}
      <main className="ml-80 flex-1 bg-white p-8">
        {currentSection && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {currentSection.title}
            </h2>
            <p className="mt-2 text-gray-600">{currentSection.description}</p>
          </div>
        )}
      </main>
    </div>
  );
}
