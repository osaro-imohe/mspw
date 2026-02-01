"use client";

const sections = [
  {
    id: "idea",
    title: "1. Describe Your Idea",
    description: "Tell us about your product or service concept",
  },
  {
    id: "site",
    title: "2. Generate Site",
    description: "Create a landing page for your campaign",
  },
  {
    id: "media",
    title: "3. Generate Media",
    description: "Generate images and videos for your campaign",
  },
  {
    id: "icp",
    title: "4. Select ICP",
    description: "Define your ideal customer profile",
  },
  {
    id: "pricing",
    title: "5. Pricing",
    description: "Set your pricing strategy and tiers",
  },
  {
    id: "variants",
    title: "6. Variants",
    description: "Create different versions to test",
  },
];

interface CampaignSidebarProps {
  selectedSection: string;
  onSelectSection: (id: string) => void;
}

export function CampaignSidebar({
  selectedSection,
  onSelectSection,
}: CampaignSidebarProps) {
  return (
    <div>
      {sections.map((section) => {
        const isSelected = selectedSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            className={`flex w-full cursor-pointer flex-col border-b border-gray-200 px-6 py-4 text-left transition-colors ${
              isSelected
                ? "border-l-2 border-l-indigo-600 bg-white"
                : "hover:bg-gray-100"
            }`}
          >
            <span
              className={`text-sm font-medium ${isSelected ? "text-indigo-600" : "text-gray-900"}`}
            >
              {section.title}
            </span>
            <span className="mt-0.5 text-xs text-gray-500">
              {section.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { sections };
