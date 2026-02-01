"use client";

const sections = [
  {
    id: "idea",
    title: "1. Describe Your Idea",
    description: "Tell us about your product or service concept",
  },
  {
    id: "icp",
    title: "2. Select ICP",
    description: "Define your ideal customer profile",
  },
  {
    id: "pricing",
    title: "3. Pricing",
    description: "Set your pricing strategy and tiers",
  },
  {
    id: "variants",
    title: "4. Variants",
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
