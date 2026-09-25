import Link from "next/link";
import { Navbar } from "@/components/chrome/navbar";
import { Footer } from "@/components/contact";
import { ManifestRow } from "@/components/chrome/manifest-row";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F0E8] text-[#111014]">
      <Navbar />
      <main id="main" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
          <ManifestRow items={["Error", "No such shipment", "LOG—404"]} />
          <h1 className="font-display mt-4 text-[22vw] leading-[0.9] md:text-[10rem]">
            Lost <span className="font-editorial normal-case">at sea</span>
            <span aria-hidden className="text-[#FF5C5C]">*</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-[#111014]/70">
            This entry isn&apos;t in the logbook. The shipments below are.
          </p>
          <Link
            href="/#projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF5C5C] px-6 py-3 text-sm font-medium text-[#F4F0E8] transition-colors hover:bg-[#111014]"
          >
            Back to shipments
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
