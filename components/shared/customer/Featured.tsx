import FeaturedCards from "./FeaturedCards";

export default function Featured() {
  const featuredPackages = [
    {
      image: "/placeholder.svg?height=200&width=400",
      alt: "Birthday Party Package",
      categories: ["Birthday Party", "Fun & Festive"],
      title: "Ultimate Birthday Bash",
      description:
        "A fun-filled party package including themed decorations, a delicious buffet, and an interactive entertainment setup.",
      portion: "Serves 20-50 guests",
      price: 40,
    },
    {
      image: "/placeholder.svg?height=200&width=400",
      alt: "Wedding Reception Package",
      categories: ["Wedding Reception", "Elegant"],
      title: "Romantic Wedding Reception",
      description:
        "A dreamy wedding setup featuring a lavish buffet, elegant floral arrangements, and live music.",
      portion: "Serves 50-200 guests",
      price: 100,
    },
    {
      image: "/placeholder.svg?height=200&width=400",
      alt: "Corporate Event Package",
      categories: ["Corporate Event", "Professional"],
      title: "Executive Business Luncheon",
      description:
        "A premium business catering service with gourmet selections, coffee stations, and networking-friendly setups.",
      portion: "Serves 30-100 guests",
      price: 75,
    },
    {
      image: "/placeholder.svg?height=200&width=400",
      alt: "Anniversary Celebration Package",
      categories: ["Anniversary Celebration", "Romantic"],
      title: "Golden Anniversary Dinner",
      description:
        "An intimate and elegant dinner setup featuring a fine dining experience with customized menu options.",
      portion: "Serves 20-80 guests",
      price: 60,
    },
    {
      image: "/placeholder.svg?height=200&width=400",
      alt: "Debut Package",
      categories: ["Debut", "Grand Celebration"],
      title: "Enchanting 18th Birthday",
      description:
        "A magical debut celebration with stunning decor, a gourmet feast, and a dance floor for an unforgettable night.",
      portion: "Serves 50-150 guests",
      price: 90,
    },
    {
      image: "/placeholder.svg?height=200&width=400",
      alt: "Baptismal / Christening Package",
      categories: ["Baptismal / Christening", "Family-Oriented"],
      title: "Sacred Blessings Celebration",
      description:
        "A heartwarming event package with a serene ambiance, traditional delicacies, and a special keepsake for guests.",
      portion: "Serves 30-70 guests",
      price: 50,
    },
  ];
  return (
    <section className="py-16 px-[2%]">
      <div className="">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Featured Packages
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Select from our most popular catering packages for weddings, corporate
          events, and private parties.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10">
          {/* Package Showcase */}
          {featuredPackages.map((feature, index) => (
            <FeaturedCards features={feature} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
