import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function NewCampaignPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create new campaign
        </h1>
      </div>
    </main>
  );
}
