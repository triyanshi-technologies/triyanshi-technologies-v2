import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHeader
      title="Page not found"
      description="The page you're looking for doesn't exist or has moved."
      className="min-h-[70vh]"
    >
      <ButtonLink href="/" className="mt-6">
        Back to Home
      </ButtonLink>
    </PageHeader>
  );
}
