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
    title: record?.builderName ? `${record.builderName}'s HH Goa 2026 Badge` : "HH Goa 2026 — Builder Card",
    description: "Beach hackathon builder cards & avatar badges at Anjuna Beach, Goa #FrameInGoa",
    openGraph: {
      title: "I built my HH Goa 2026 frame",
      description: "Beach hackathon builder cards & avatar badges at Anjuna Beach, Goa #FrameInGoa",
      images: [imageUrl]
    },
    twitter: {
      card: "summary_large_image",
      title: "I built my HH Goa 2026 frame",
      description: "Beach hackathon builder cards & avatar badges at Anjuna Beach, Goa #FrameInGoa",
      images: [imageUrl]
    }
  };
}

export default async function SharePage({ params }: Props) {
  const { shareId } = await params;
  const record = await getShareRecord(shareId);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-5 py-12 text-center bg-monsoon text-sand">
      <div className="flex items-center gap-2 font-mono text-xs text-tide uppercase tracking-widest">
        <span>HH GOA 2026</span>
        <span>•</span>
        <span>BUILDER PASS</span>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-sand/30 shadow-2xl">
        <img
          src={record?.imageUrl ?? "/assets/og-default.svg"}
          alt="HH Goa 2026 branded graphic"
          className="w-full h-auto object-cover"
        />
      </div>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-tide text-ink px-8 py-3 font-display text-sm font-bold tracking-wider uppercase shadow-lg hover:bg-tide/90 transition-transform active:scale-95"
      >
        Build your own →
      </Link>
    </main>
  );
}
