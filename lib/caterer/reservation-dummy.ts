export const reservations = [
  {
    id: "RES-1234",
    customer: {
      name: "Ashley Wilson",
      email: "ashley.wilson@example.com",
      phone: "+1 (555) 123-4567",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 10, 18, 0), // March 10, 2025, 6:00 PM
    totalPrice: 2580,
    status: "confirmed",
    createdDate: new Date(2025, 2, 1),
    guests: 75,
    address: "123 Wedding Venue, Springfield, IL",
    specialInstructions:
      "Bride has nut allergy. Please ensure all dishes are nut-free.",
    items: [
      { name: "Wedding Package - Premium", quantity: 1, price: 2000 },
      { name: "Additional Appetizers", quantity: 3, price: 180 },
      { name: "Champagne Toast", quantity: 1, price: 400 },
    ],
    payment: {
      status: "paid",
      date: new Date(2025, 2, 5),
      amount: 2580,
    },
    isUrgent: true,
  },
  {
    id: "RES-1235",
    customer: {
      name: "Tech Inc.",
      email: "events@techinc.com",
      phone: "+1 (555) 987-6543",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 11, 12, 0), // March 11, 2025, 12:00 PM
    totalPrice: 1200,
    status: "confirmed",
    createdDate: new Date(2025, 2, 3),
    guests: 30,
    address: "456 Tech Inc. HQ, Springfield, IL",
    specialInstructions: "Vegetarian options needed for 10 guests.",
    items: [
      { name: "Corporate Lunch Package", quantity: 1, price: 900 },
      { name: "Premium Dessert Platter", quantity: 2, price: 300 },
    ],
    payment: {
      status: "paid",
      date: new Date(2025, 2, 7),
      amount: 1200,
    },
    isUrgent: true,
  },
  {
    id: "RES-1236",
    customer: {
      name: "Smith Family",
      email: "john.smith@example.com",
      phone: "+1 (555) 456-7890",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 14, 17, 0), // March 14, 2025, 5:00 PM
    totalPrice: 950,
    status: "pending",
    createdDate: new Date(2025, 2, 4),
    guests: 25,
    address: "789 Community Center, Springfield, IL",
    specialInstructions: "Family-style service preferred.",
    items: [
      { name: "Family Gathering Package", quantity: 1, price: 750 },
      { name: "Additional Sides", quantity: 4, price: 200 },
    ],
    payment: {
      status: "pending",
      date: null,
      amount: 950,
    },
    isUrgent: false,
  },
  {
    id: "RES-1237",
    customer: {
      name: "Guest Order",
      email: "maria@example.com",
      phone: "+1 (555) 234-5678",
      isRegistered: false,
    },
    eventDate: new Date(2025, 2, 15, 19, 30), // March 15, 2025, 7:30 PM
    totalPrice: 350,
    status: "pending",
    createdDate: new Date(2025, 2, 5),
    guests: 10,
    address: "101 Residential St, Springfield, IL",
    specialInstructions: "Delivery requested by 7:15 PM.",
    items: [
      { name: "Dinner Party Package - Basic", quantity: 1, price: 300 },
      { name: "Specialty Drinks", quantity: 10, price: 50 },
    ],
    payment: {
      status: "pending",
      date: null,
      amount: 350,
    },
    isUrgent: false,
  },
  {
    id: "RES-1238",
    customer: {
      name: "Johnson Wedding",
      email: "johnson.wedding@example.com",
      phone: "+1 (555) 876-5432",
      isRegistered: true,
    },
    eventDate: new Date(2025, 3, 5, 16, 0), // April 5, 2025, 4:00 PM
    totalPrice: 3200,
    status: "confirmed",
    createdDate: new Date(2025, 1, 15),
    guests: 100,
    address: "200 Elegant Venue, Springfield, IL",
    specialInstructions:
      "Gluten-free options for 15 guests. Custom cake topper will be provided.",
    items: [
      { name: "Wedding Package - Deluxe", quantity: 1, price: 2800 },
      { name: "Premium Bar Service", quantity: 1, price: 400 },
    ],
    payment: {
      status: "paid",
      date: new Date(2025, 1, 20),
      amount: 3200,
    },
    isUrgent: false,
  },
  {
    id: "RES-1239",
    customer: {
      name: "Community Center",
      email: "events@communitycenter.org",
      phone: "+1 (555) 345-6789",
      isRegistered: true,
    },
    eventDate: new Date(2025, 2, 20, 11, 0), // March 20, 2025, 11:00 AM
    totalPrice: 1500,
    status: "confirmed",
    createdDate: new Date(2025, 1, 25),
    guests: 50,
    address: "300 Community Way, Springfield, IL",
    specialInstructions: "Buffet style. Need setup by 10:30 AM.",
    items: [
      { name: "Community Event Package", quantity: 1, price: 1200 },
      { name: "Additional Appetizers", quantity: 5, price: 300 },
    ],
    payment: {
      status: "paid",
      date: new Date(2025, 2, 1),
      amount: 1500,
    },
    isUrgent: false,
  },
  {
    id: "RES-1240",
    customer: {
      name: "Birthday Celebration",
      email: "birthday@example.com",
      phone: "+1 (555) 567-8901",
      isRegistered: false,
    },
    eventDate: new Date(2025, 2, 25, 18, 30), // March 25, 2025, 6:30 PM
    totalPrice: 750,
    status: "pending",
    createdDate: new Date(2025, 2, 8),
    guests: 20,
    address: "400 Party Place, Springfield, IL",
    specialInstructions:
      "Birthday cake for 50th celebration. Blue and silver theme.",
    items: [
      { name: "Birthday Package - Standard", quantity: 1, price: 600 },
      { name: "Custom Cake", quantity: 1, price: 150 },
    ],
    payment: {
      status: "pending",
      date: null,
      amount: 750,
    },
    isUrgent: false,
  },
  {
    id: "RES-1241",
    customer: {
      name: "Corporate Training",
      email: "training@corporation.com",
      phone: "+1 (555) 678-9012",
      isRegistered: true,
    },
    eventDate: new Date(2025, 3, 2, 9, 0), // April 2, 2025, 9:00 AM
    totalPrice: 900,
    status: "confirmed",
    createdDate: new Date(2025, 2, 1),
    guests: 25,
    address: "500 Corporate Blvd, Springfield, IL",
    specialInstructions:
      "Continental breakfast and lunch. Coffee service all day.",
    items: [{ name: "All-Day Corporate Package", quantity: 1, price: 900 }],
    payment: {
      status: "paid",
      date: new Date(2025, 2, 5),
      amount: 900,
    },
    isUrgent: false,
  },
  {
    id: "RES-1242",
    customer: {
      name: "Retirement Party",
      email: "retirement@example.com",
      phone: "+1 (555) 789-0123",
      isRegistered: false,
    },
    eventDate: new Date(2025, 3, 10, 17, 0), // April 10, 2025, 5:00 PM
    totalPrice: 1100,
    status: "pending",
    createdDate: new Date(2025, 2, 7),
    guests: 35,
    address: "600 Garden Venue, Springfield, IL",
    specialInstructions:
      "Surprise party. Contact secondary number for details.",
    items: [
      { name: "Celebration Package", quantity: 1, price: 850 },
      { name: "Premium Wine Selection", quantity: 1, price: 250 },
    ],
    payment: {
      status: "pending",
      date: null,
      amount: 1100,
    },
    isUrgent: false,
  },
  {
    id: "RES-1243",
    customer: {
      name: "Charity Gala",
      email: "gala@charity.org",
      phone: "+1 (555) 890-1234",
      isRegistered: true,
    },
    eventDate: new Date(2025, 3, 15, 19, 0), // April 15, 2025, 7:00 PM
    totalPrice: 5000,
    status: "confirmed",
    createdDate: new Date(2025, 1, 10),
    guests: 150,
    address: "700 Grand Hall, Springfield, IL",
    specialInstructions:
      "Formal plated dinner. Special dietary needs list will be provided 1 week before event.",
    items: [
      { name: "Gala Package - Premium", quantity: 1, price: 4500 },
      { name: "Specialty Dessert Station", quantity: 1, price: 500 },
    ],
    payment: {
      status: "paid",
      date: new Date(2025, 1, 15),
      amount: 5000,
    },
    isUrgent: false,
  },
];
