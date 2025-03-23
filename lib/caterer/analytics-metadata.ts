// Sample data for chart
const chartData = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 78 },
  { month: "May", value: 90 },
  { month: "Jun", value: 85 },
  { month: "Jul", value: 92 },
];

// Sample data for trending packages
const trendingPackages = [
  {
    id: 1,
    name: "Wedding Bliss",
    eventType: "Wedding",
    price: 1200.0,
    sales: 524,
    percentChange: 12,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Birthday Bash",
    eventType: "Birthday",
    price: 450.0,
    sales: 224,
    percentChange: 12,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Corporate Lunch",
    eventType: "Corporate",
    price: 350.0,
    sales: 124,
    percentChange: 12,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Graduation Party",
    eventType: "Graduation",
    price: 650.0,
    sales: 104,
    percentChange: 12,
    image: "/placeholder.svg?height=80&width=80",
  },
];

// Sample data for most favorite dishes
const favoriteMenus = [
  {
    id: 1,
    name: "Grilled Salmon",
    image: "/placeholder.svg?height=200&width=300",
    likes: 12500,
  },
  {
    id: 2,
    name: "Beef Wellington",
    image: "/placeholder.svg?height=200&width=300",
    likes: 12500,
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    image: "/placeholder.svg?height=200&width=300",
    likes: 12500,
  },
  {
    id: 4,
    name: "Caesar Salad",
    image: "/placeholder.svg?height=200&width=300",
    likes: 12500,
  },
];

// Sample data for most selling dishes
const mostSellingMenus = [
  {
    id: 1,
    name: "Grilled Salmon",
    category: "Main",
    price: 15.24,
    image: "/placeholder.svg?height=80&width=80",
    servesFor: "4 Person",
    prepTime: "24mins",
  },
  {
    id: 2,
    name: "Beef Wellington",
    category: "Main",
    price: 15.24,
    image: "/placeholder.svg?height=80&width=80",
    servesFor: "4 Person",
    prepTime: "24mins",
  },
  {
    id: 3,
    name: "Chocolate Mousse",
    category: "Dessert",
    price: 15.24,
    image: "/placeholder.svg?height=80&width=80",
    servesFor: "4 Person",
    prepTime: "24mins",
  },
  {
    id: 4,
    name: "Caesar Salad",
    category: "Appetizer",
    price: 15.24,
    image: "/placeholder.svg?height=80&width=80",
    servesFor: "4 Person",
    prepTime: "24mins",
  },
];

export { chartData, trendingPackages, favoriteMenus, mostSellingMenus };
