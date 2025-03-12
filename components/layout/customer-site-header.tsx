import Link from "next/link";

export default function CustomerSiteHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-xl">
            GourmetCater
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/collection"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Our Menus
            </Link>
            <Link
              href="/about-us"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Cart
          </Link>
          <Link
            href="/account"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Account
          </Link>
          <button className="size-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </header>
  );
}
