import type { Metadata } from "next";
import Link from "next/link";
import { getShareRecord } from "@/lib/share-store";

interface Props {
  params: Promise<{ shareId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shareId } = await params;
  const record = await getShareRecord(shareId);
  const imageUrl = record?.imageUrl ?? "/assets/og-default.svg";

  return {
    title: record?.builderName ? `${record.builderName}'s HH Goa 2026 Badge` : "HH Goa 2026 — Builder Pass",
    description: "Beach hackathon builder cards & avatar badges at Anjuna Beach, Goa #FramedInGoa #FrameInGoa",
    openGraph: {
      title: "HH Goa 2026 — Official Builder Pass",
      description: "Beach hackathon builder cards & avatar badges at Anjuna Beach, Goa #FramedInGoa #FrameInGoa",
      images: [imageUrl]
    },
    twitter: {
      card: "summary_large_image",
      title: "HH Goa 2026 — Official Builder Pass",
      description: "Beach hackathon builder cards & avatar badges at Anjuna Beach, Goa #FramedInGoa #FrameInGoa",
      images: [imageUrl]
    }
  };
}

export default async function SharePage({ params }: Props) {
  const { shareId } = await params;
  const record = await getShareRecord(shareId);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-5 py-12 text-center bg-[#062B1F] text-[#E8F3EC] ambient-sunrise-bg">
      <div className="flex items-center gap-2 border border-[#FFC24B]/40 bg-[#062B1F]/80 px-3 py-1 rounded-full backdrop-blur-md">
        <svg width="24" height="18" viewBox="0 0 130 50" fill="none" stroke="#FFC24B" strokeWidth="4" strokeLinecap="round">
          <path d="M0 4 L130 4 M15 4 L15 30 A7 7 0 0 0 29 30 M38 4 L38 46 M70 4 L70 46 M58 24 A12 12 0 1 1 58 24.01 M92 4 L92 46 M92 4 Q80 -16 72 -14" />
        </svg>
        <span className="font-mono text-xs font-bold text-[#FFC24B] tracking-widest uppercase">
          HH GOA 2026 • BUILDER PASS
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-3xl border border-[#FFC24B]/40 shadow-[0_0_30px_rgba(11,104,57,0.4)]">
        <img
          src={record?.imageUrl ?? "/assets/og-default.svg"}
          alt="HH Goa 2026 branded graphic"
          className="w-full h-auto object-cover"
        />
      </div>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-2xl bg-[#0B6839] text-[#E8F3EC] border border-[#7CFF6B]/50 px-8 py-3.5 font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(124,255,107,0.4)] hover:bg-[#0B6839]/90 transition-transform active:scale-95"
      >
        Build your own pass →
      </Link>
    </main>
  );
}

