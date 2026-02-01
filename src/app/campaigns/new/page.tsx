import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { CampaignContent } from "./campaign-content";

export default async function NewCampaignPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return <CampaignContent />;
}
