import BookNowForm from "@/components/shared/customer/BookNowForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now",
};

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="w-full max-w-4xl mx-auto py-12 px-[5%]">
      <BookNowForm id={id} />
    </main>
  );
}
