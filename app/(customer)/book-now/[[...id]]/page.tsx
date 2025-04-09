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
    <div className="w-full max-w-4xl mx-auto py-12 px-[5%]">
      <div className="mb-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Reserve Your Catering Service
          </h1>
          <p className="text-muted-foreground">
            Complete the form below to book your event
          </p>
        </div>
      </div>
      <BookNowForm id={id} />
    </div>
  );
}
