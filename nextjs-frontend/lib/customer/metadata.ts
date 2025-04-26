import { Award, Clock, Heart, ThumbsUp, Users, Utensils } from "lucide-react";

const principles = [
  {
    title: "Quality Without Compromise",
    content:
      "We source only the finest ingredients and employ skilled culinary artisans to ensure every dish exceeds expectations.",
  },
  {
    title: "Personalized Service",
    content:
      "Every event is unique, and we take pride in tailoring our services to match your vision perfectly.",
  },
  {
    title: "Sustainable Practices",
    content:
      "We're committed to environmental responsibility through local sourcing and eco-friendly operations.",
  },
  {
    title: "Innovation in Cuisine",
    content:
      "Our chefs constantly explore new flavors and techniques while respecting traditional culinary arts.",
  },
];
const teams = {
  leadership: [
    {
      name: "Sarah Johnson",
      title: "Founder & CEO",
      description: "20+ years of culinary excellence and business leadership",
      image: "/images/sarah.jpg",
    },
    {
      name: "Michael Chen",
      title: "Executive Chef",
      description: "Michelin-starred chef with global culinary expertise",
      image: "/images/michael.jpg",
    },
    {
      name: "Emily Rodriguez",
      title: "Operations Director",
      description: "Expert in large-scale event management",
      image: "/images/emily.jpg",
    },
  ],
  culinary: [
    {
      name: "David Park",
      title: "Head Chef - Asian Cuisine",
      image: "/images/david.jpg",
    },
    {
      name: "Maria Santos",
      title: "Head Chef - Mediterranean",
      image: "/images/maria.jpg",
    },
    {
      name: "James Wilson",
      title: "Pastry Chef",
      image: "/images/james.jpg",
    },
    {
      name: "Aisha Patel",
      title: "Head Chef - Indian Cuisine",
      image: "/images/aisha.jpg",
    },
  ],
  event: [
    {
      name: "Lisa Thompson",
      title: "Senior Event Coordinator",
      image: "/images/lisa.jpg",
    },
    {
      name: "Marcus Brown",
      title: "Wedding Specialist",
      image: "/images/marcus.jpg",
    },
    {
      name: "Sophie Kim",
      title: "Corporate Events Manager",
      image: "/images/kim.jpg",
    },
    {
      name: "Carlos Mendez",
      title: "Logistics Coordinator",
      image: "/images/mendez.jpg",
    },
  ],
  service: [
    {
      name: "Ryan Mitchell",
      title: "Head Server",
      image: "/images/ryan.jpg",
    },
    {
      name: "Nina Patel",
      title: "Senior Server",
      image: "/images/nina.jpg",
    },
    {
      name: "Tom Wilson",
      title: "Bartender",
      image: "/images/tom.jpg",
    },
    {
      name: "Grace Lee",
      title: "Service Captain",
      image: "/images/grace.jpg",
    },
    {
      name: "Alex Rivera",
      title: "Setup Specialist",
      image: "/images/alex.jpg",
    },
  ],
};

const features = [
  {
    icon: Award,
    title: "Award-Winning Cuisine",
    description:
      "Our culinary team has received numerous accolades for their innovative and delicious creations that will impress your guests.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "With over 15 years in the industry, our team has the expertise to handle events of any size and complexity with precision.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description:
      "We work closely with you to create a customized menu and experience that perfectly reflects your taste and vision.",
  },
  {
    icon: Utensils,
    title: "Premium Ingredients",
    description:
      "We source only the freshest, highest-quality ingredients to ensure exceptional taste and presentation for your event.",
  },
  {
    icon: Clock,
    title: "Punctual Delivery",
    description:
      "We understand timing is crucial for events. Our team ensures everything is delivered and set up right on schedule.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description:
      "Your satisfaction is our priority. We go above and beyond to exceed expectations and create memorable experiences.",
  },
];

export { teams, principles, features };
