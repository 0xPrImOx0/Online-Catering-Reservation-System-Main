import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`flex flex-row justify-center items-center h-screen`}>
      <Button className="w-32 py-4 px-2" asChild>
        <Link href="/auth">Login</Link>
      </Button>
    </div>
  );
}
