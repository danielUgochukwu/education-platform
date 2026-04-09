import { SupportClient, type SupportType } from "./support-client";

function resolveSupportType(type?: string): SupportType {
  return type === "partner" ? "partner" : "donor";
}

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  return <SupportClient initialType={resolveSupportType(type)} />;
}
