// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
// const { BusinessType} = require("@/app/lib/definitions");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.ceil(number / 10) * 10;
}


const transactions = [
  {
    id: 'tr1',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    businessId: 'b1',
    amount: 50.00,
    date: '2023-11-15T10:30:00Z'
  },
  {
    id: 'tr2',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    businessId: 'b2',
    amount: 75.50,
    date: '2023-11-16T14:45:00Z'
  },
  {
    id: 'tr3',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    businessId: 'b3',
    amount: 120.25,
    date: '2023-11-17T09:15:00Z'
  },
  {
    id: 'tr4',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    businessId: 'b4',
    amount: 30.00,
    date: '2023-11-18T16:20:00Z'
  },
  {
    id: 'tr5',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    businessId: 'b5',
    amount: 95.75,
    date: '2023-11-19T11:00:00Z'
  }
];

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    type: 'creator',
    email: 'garrett@trykiln.com',
    password: '123456',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    type: 'creator',
    email: 'jim@trykiln.com',
    password: 'password',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    type: 'creator',
    email: 'kim@gmail.com',
    password: '123456',
  },
  {
    id: '1e082498-f20d-4db2-8119-5aa33e0529bc',
    type: 'business',
    email: 'yale@trykiln.com',
    password: '123456',
  },
];

const creators = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Garrett OGrady',
    email: 'garrett@trykiln.com',
    phone: '6164308879',
    city: 'Los Angeles, CA',
    instagram: 'gartogo',
    tiktok: 'gartogo',
    password: '123456',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Yale Goldberg',
    email: 'yale@trykiln.com',
    phone: '3109932751',
    city: 'Los Angeles, CA',
    instagram: 'yale_goldberg',
    tiktok: 'yale_goldberg',
    password: 'password',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Kim Kardashian',
    email: 'kim@gmail.com',
    phone: '3109932755',
    city: 'New York, CA',
    instagram: 'kimk',
    tiktok: 'kimk',
    password: '123456',
  },
];

const creatorsignup = [
  {
    id: 'b46b19c6-11b7-4903-a489-83ceeeb3649b',
    name: 'Garrett OGrady',
    email: 'garrett5@trykiln.com',
    phone: '6164308879',
    city: 'Los Angeles, CA',
    instagram: 'gartogo5',
    tiktok: 'gartogo5',
  },
  {
    id: '8b5dc888-745e-4c45-8059-0d92bd137c8e',
    name: 'Yale Goldberg',
    email: 'yale6@trykiln.com',
    phone: '3109932751',
    city: 'Los Angeles, CA',
    instagram: 'yale_goldberg5',
    tiktok: 'yale_goldberg5',
  }
];

const enrollment = [
  { promotionId: 'e6cf9e2f-1405-45e3-9c76-d62f25f80a7d', userId: '410544b2-4001-4271-9855-fec4b6a6442a', businessId: '1e082498-f20d-4db2-8119-5aa33e0529bc',  date: Date.now(), amount: 10475, status: "redeemed" },
  { promotionId: '3b508ec3-1a7c-4e6a-a2d7-770b43fb3749', userId: '410544b2-4001-4271-9855-fec4b6a6442a', businessId: 'f0c51f16-b154-40eb-b8d2-c1179df34ed1',  date: Date.now(), amount: 7000, status: "redeemed" }
];
const businesses = [
  {
    id: "1e082498-f20d-4db2-8119-5aa33e0529bc",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Bludso's BBQ",
    businessDescription: "Iconic Texas-style barbecue restaurant offering a wide range of smoked meats and home-style sides.",
    businessInstagram: "bludsosbbq",
    businessTikTok: "bludsosbbq",
    contactName: "John Doe",
    contactPhoneNumber: "323-555-0123",
    contactEmail: "contact@bludsosbbq.com",
    address: "609 N La Brea Ave, Los Angeles, CA 90036",
    placesId: "ChIJp_7JFtW4woARXx7gCARV3r8",
    locationLat: "34.0822407",
    locationLng: "-118.3444056",
    featuredImage: "",
    tags: ["BBQ", "Meats", "Dining"]
  },
  {
    id: "781b52ae-1a4a-4f89-a571-cb113c8d6537",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Honey's Kettle Fried Chicken",
    businessDescription: "Serving crispy, hand-dipped fried chicken with homemade sides and biscuits in a family-friendly atmosphere.",
    businessInstagram: "honeyskettle",
    businessTikTok: "honeyskettle",
    contactName: "Jane Smith",
    contactPhoneNumber: "310-555-0189",
    contactEmail: "info@honeyskettle.com",
    address: "9537 Culver Blvd, Culver City, CA 90232",
    placesId: "ChIJ4RFNpCm6woAR_z6Azd2jvmk",
    locationLat: "34.0232261",
    locationLng: "-118.3954684",
    featuredImage: "",
    tags: ["Chicken", "ComfortFood", "Eatery"]
  },
  {
    id: "b50426b3-3651-4de0-a299-e576e19e86f8",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Meals by Genet",
    businessDescription: "Authentic Ethiopian cuisine served in a traditional setting, perfect for experiencing communal dining.",
    businessInstagram: "mealsbygenet",
    businessTikTok: "mealsbygenet",
    contactName: "Sarah Johnson",
    contactPhoneNumber: "323-555-0190",
    contactEmail: "sarah@mealsbygenet.com",
    address: "1053 S Fairfax Ave, Los Angeles, CA 90019",
    placesId: "ChIJW9SZwxW5woARkrzV1YcRMAE",
    locationLat: "34.0566737",
    locationLng: "-118.3647262",
    featuredImage: "",
    tags: ["Ethiopian", "Traditional", "Cuisine"]
  },
  {
    id: "3f38c6b8-0d11-4e4b-8d36-ec16162859c9",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Jones Hollywood",
    businessDescription: "A trendy spot known for its Italian-American classics, stylish decor, and vibrant nightlife.",
    businessInstagram: "joneshollywood",
    businessTikTok: "joneshollywood",
    contactName: "Mike Brown",
    contactPhoneNumber: "310-555-0112",
    contactEmail: "contact@joneshollywood.com",
    address: "7205 Santa Monica Blvd, West Hollywood, CA 90046",
    placesId: "ChIJ_ZaCK9a-woARo6DSOmfgk4s",
    locationLat: "34.0908821",
    locationLng: "-118.3464231",
    featuredImage: "",
    tags: ["Italian", "American", "Bar"]
  },
  {
    id: "b1b519d0-f3f1-4a76-8f32-06c7068ff1ac",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Musso & Frank Grill",
    businessDescription: "Classic Hollywood eatery known for its historic charm and a menu that features steakhouse favorites.",
    businessInstagram: "mussoandfrank",
    businessTikTok: "mussoandfrank",
    contactName: "Tom Wilson",
    contactPhoneNumber: "323-555-0145",
    contactEmail: "info@mussoandfrank.com",
    address: "6667 Hollywood Blvd, Hollywood, CA 90028",
    placesId: "ChIJaZ3OWSO_woARSF1VduqxGgY",
    locationLat: "34.1017527",
    locationLng: "-118.335361",
    featuredImage: "",
    tags: ["Steakhouse", "Historic", "Hollywood"]
  },
  {
    id: "f0c51f16-b154-40eb-b8d2-c1179df34ed1",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Danbi",
    businessDescription: "Modern Korean cuisine in a chic setting, offering innovative dishes and a curated selection of wines.",
    businessInstagram: "danbila",
    businessTikTok: "danbila",
    contactName: "Emily Choi",
    contactPhoneNumber: "213-555-0187",
    contactEmail: "reservations@danbila.com",
    address: "3465 W 6th St Suite 90-100, Los Angeles, CA 90020",
    placesId: "ChIJuTPeFhzHwoARI7fwwRTGm6o",
    locationLat: "34.0639719",
    locationLng: "-118.296799",
    featuredImage: "",
    tags: ["Korean", "Modern", "Wine"]
  },
  {
    id: "55e222fd-d020-46d9-9e49-aae42fafd66c",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "KTEAM BBQ",
    businessDescription: "Lively Korean BBQ place where guests can grill their own selections of marinated meats at the table.",
    businessInstagram: "kteambbq",
    businessTikTok: "kteambbq",
    contactName: "David Kim",
    contactPhoneNumber: "323-555-0133",
    contactEmail: "dkim@kteambbq.com",
    address: "936 S Vermont Ave, Los Angeles, CA 90006",
    placesId: "ChIJ7_SxewDHwoARyB-lNf7XlZs",
    locationLat: "34.0546203",
    locationLng: "-118.291332",
    featuredImage: "",
    tags: ["BBQ", "Korean", "Interactive"]
  },
  {
    id: "b6400d89-163e-4ef1-9a7c-f68a77507056",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Bavel",
    businessDescription: "Middle Eastern restaurant by renowned chefs, known for its innovative dishes and upscale ambiance.",
    businessInstagram: "bavel",
    businessTikTok: "bavel",
    contactName: "Olivia Sanchez",
    contactPhoneNumber: "213-555-0223",
    contactEmail: "contact@bavel.com",
    address: "500 Mateo St #102, Los Angeles, CA 90013",
    placesId: "ChIJAQDw5jzGwoARJ0ddsqWyCAQ",
    locationLat: "34.04148699999999",
    locationLng: "-118.2329313",
    featuredImage: "",
    tags: ["MiddleEastern", "Upscale", "Innovative"]
  },
  {
    id: "e96d48b0-843a-4b2f-985e-ae7c831f54bf",
    businessType: "Restaurant",
    promotions: [""],
    businessName: "Bossa Nova",
    businessDescription: "Brazilian restaurant offering a fusion of traditional flavors with a modern twist in a lively setting.",
    businessInstagram: "bossanova",
    businessTikTok: "bossanova",
    contactName: "Carlos Mendes",
    contactPhoneNumber: "310-555-0202",
    contactEmail: "cmendes@bossanova.com",
    address: "321 W Olympic Blvd Suite B, Los Angeles, CA 90015",
    placesId: "ChIJp3y0Q-XHwoARnVlw5ZyCCic",
    locationLat: "34.0423792",
    locationLng: "-118.2592534",
    featuredImage: "",
    tags: ["Brazilian", "Fusion", "Lively"]
  }
];

const promotions = [
  {
    id: "e6cf9e2f-1405-45e3-9c76-d62f25f80a7d",
    businessId: "1e082498-f20d-4db2-8119-5aa33e0529bc",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Two weeks from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "BBQ Bonanza at Bludso's",
    description: "Enjoy a mouthwatering BBQ feast at Bludso's BBQ, featuring our famous smoked meats and savory sides.",
    suggestedItems: "Try our signature smoked brisket, fall-off-the-bone ribs, and homemade cornbread.",
    availabilityStart: "17:00",
    availabilityEnd: "22:00",
    city: "Los Angeles",
    pricingType: "fixed",
    fixedOffer: 10000,
    tierOneOffer: "",
    tierTwoOffer: "",
    tierThreeOffer: "",
    maxTotalSpend: 500000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "picture",
    featuredImage: "/business/bludsos.jpg",
    images: [
      "https://images.squarespace-cdn.com/content/v1/6414acb85552af47d5d97a24/54a8bd05-ad22-4043-919b-d056333a353e/Sandwich+Trio+-+Pulled+Pork%2C+Brisket%2C+Brisket+%26+Hot+Link.jpg",
      "https://www.ocregister.com/wp-content/uploads/2022/04/OCR-L-BLUDSO-0327-10-LO.jpg?w=620",
      "https://images.squarespace-cdn.com/content/v1/6414acb85552af47d5d97a24/f2ce15ad-1b70-4a0a-8b54-c863b22010e6/Beef+Ribs.jpg"
    ],
    tags: ["BBQ", "Dinner", "Deal"]
  },
  {
    id: "3b508ec3-1a7c-4e6a-a2d7-770b43fb3749",
    businessId: "781b52ae-1a4a-4f89-a571-cb113c8d6537",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // Three weeks from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Crispy Treat at Honey's Kettle",
    description: "Dive into the crunch with Honey's Kettle Fried Chicken's special dinner promo, featuring our golden crispy chicken and homemade sides.",
    suggestedItems: "Don't miss our crispy fried chicken, honey-drizzled biscuits, and creamy coleslaw.",
    availabilityStart: "16:30",
    availabilityEnd: "21:30",
    city: "Los Angeles",
    pricingType: "fixed",
    fixedOffer: 5000,
    tierOneOffer: "",
    tierTwoOffer: "",
    tierThreeOffer: "",
    maxTotalSpend: 100000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "reel",
    mediaType: "video",
    featuredImage: "/business/honeykettle.jpg",
    images: [
      "https://honeyskettle.com/wp-content/uploads/2021/05/Culvery-city.jpg",
      "https://farm9.staticflickr.com/8331/8149831185_247ee9594f_b.jpg"
    ],
    tags: ["Chicken", "Crispy", "Special"]
  },
  {
    id: "c2e9f61c-cfb8-47f1-a1c0-d12eee6a1647",
    businessId: "b50426b3-3651-4de0-a299-e576e19e86f8",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Ethiopian Delight at Meals by Genet",
    description: "Experience authentic Ethiopian dining with a special dinner offer at Meals by Genet, featuring communal plates and exotic flavors.",
    suggestedItems: "Try the Doro Wat and Vegetarian Combo for a true Ethiopian experience.",
    availabilityStart: "16:00",
    availabilityEnd: "20:00",
    city: "Los Angeles",
    pricingType: "fixed",
    fixedOffer: 10000,
    tierOneOffer: "",
    tierTwoOffer: "",
    tierThreeOffer: "",
    maxTotalSpend: 100000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "picture",
    featuredImage: "/business/genet.jpg",
    images: [
      "https://images.squarespace-cdn.com/content/v1/625c2b85f85b4b26602993e8/227c0b4c-f59a-4f1c-add6-7670f59d19ee/Screen+Shot+2022-04-17+at+8.31.45+AM.jpg",
      "https://media.timeout.com/images/103512549/750/422/image.jpg",
      "https://ca-times.brightspotcdn.com/dims4/default/a76b0fc/2147483647/strip/true/crop/3324x2216+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fec%2F88%2F4adce1654c4a91be7798af3867aa%2Fla-photos-1staff-767464-fo-0506-genet-agonafer-mrt-41.jpg"
    ],
    tags: ["Ethiopian", "Exotic", "Communal"]
  },
  {
    id: "c0e56323-30af-4243-a4a1-73c57f6ad7f0",
    businessId: "3f38c6b8-0d11-4e4b-8d36-ec16162859c9",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Ten days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Italian Nights at Jones Hollywood",
    description: "Indulge in our Italian-American classics with a twist during our special dinner nights at Jones Hollywood.",
    suggestedItems: "Don't miss our Spaghetti with Meatballs and Garlic Bread.",
    availabilityStart: "18:00",
    availabilityEnd: "23:00",
    city: "Los Angeles",
    pricingType: "tiered",
    fixedOffer: "",
    tierOneOffer: 25000,
    tierTwoOffer: 15000,
    tierThreeOffer: 5000,
    maxTotalSpend: 1000000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "picture",
    featuredImage: "/business/jones.jpg",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpIhczkAbldBrcPj_h6gGGN1EI2k1qrcOTg&s",
      "https://res.cloudinary.com/the-infatuation/image/upload/q_auto,f_auto/cms/beta/JakobLayman.JonesHollywood_001",
      "https://res.cloudinary.com/the-infatuation/image/upload/v1656119652/cms/reviews/jones-hollywood/JakobLayman.Jones.SpaghettiwithMeatballs_012.jpg"
    ],
    tags: ["Italian", "Nightlife", "Gourmet"]
  },
  {
    id: "d9967a03-a51a-4270-b535-f3d95bf1a024",
    businessId: "b1b519d0-f3f1-4a76-8f32-06c7068ff1ac",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Fifteen days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Steak Night at Musso & Frank Grill",
    description: "Savor the taste of our premium steaks at Musso & Frank Grill with a special price offer on all steak dinners.",
    suggestedItems: "Try our Filet Mignon and the legendary Martini.",
    availabilityStart: "17:30",
    availabilityEnd: "22:30",
    city: "Los Angeles",
    pricingType: "tiered",
    fixedOffer: "",
    tierOneOffer: 25000,
    tierTwoOffer: 15000,
    tierThreeOffer: 5000,
    maxTotalSpend: 1000000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "picture",
    featuredImage: "/business/mussofrank.jpg",
    images: [
      "https://www.opentable.com/blog/wp-content/uploads/sites/108/2023/10/new-room-photo-by-tina-whatcott-echeverria.jpg",
      "https://static01.nyt.com/images/2019/08/02/us/02mussocatoday1/02mussocatoday1-superJumbo.jpg",
      "https://scpr.brightspotcdn.com/legacy/i/7c7e6a00521d6bb25c1b301730271292/5db8adfbc92b3500089d2a4e-eight.jpg"
    ],
    tags: ["Steakhouse", "Classic", "Luxury"]
  },
  {
    id: "3e003ac5-5637-4b7c-8b79-2f8516793414",
    businessId: "f0c51f16-b154-40eb-b8d2-c1179df34ed1",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Korean Culinary Adventure at Danbi",
    description: "Explore the rich flavors of Korea with our special dinner menu featuring modern twists on traditional dishes at Danbi.",
    suggestedItems: "Don't miss the Bulgogi and Kimchi Pancakes.",
    availabilityStart: "18:00",
    availabilityEnd: "22:00",
    city: "Los Angeles",
    pricingType: "tiered",
    fixedOffer: "",
    tierOneOffer: 25000,
    tierTwoOffer: 15000,
    tierThreeOffer: 5000,
    maxTotalSpend: 1000000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "picture",
    featuredImage: "/business/danbi.jpg",
    images: [
      "https://ca-times.brightspotcdn.com/dims4/default/e62aa15/2147483647/strip/true/crop/6240x4160+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb0%2F76%2F9d4e0c5544a9ab7a397795281e50%2Fdanbi-restaurant-by-stephanie-breijo-2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9G-X6CDAB3pp_q6IsFuXgdPNKPKvJ33v8kA&s",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/98/1c/4e/danbi-korean-restaurant.jpg?w=1200&h=-1&s=1"
    ],
    tags: ["Korean", "Modern", "Gourmet"]
  },
  {
    id: "fdda54fb-6f3c-4849-8a93-23d28ca8b222",
    businessId: "55e222fd-d020-46d9-9e49-aae42fafd66c",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // Eighteen days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Interactive BBQ Fun at KTEAM BBQ",
    description: "Get your grill on with our interactive Korean BBQ experience. Cook your favorite meats to perfection at KTEAM BBQ.",
    suggestedItems: "Try the marinated short ribs and spicy pork belly.",
    availabilityStart: "17:00",
    availabilityEnd: "22:00",
    city: "Los Angeles",
    pricingType: "tiered",
    fixedOffer: "",
    tierOneOffer: 25000,
    tierTwoOffer: 15000,
    tierThreeOffer: 5000,
    maxTotalSpend: 1000000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "both",
    featuredImage: "/business/kteam.jpg",
    images: [
      "/promotions/kteambbq-1.jpg",
      "/promotions/kteambbq-2.jpg",
      "/promotions/kteambbq-3.jpg",
    ],
    tags: ["BBQ", "Interactive", "Fun"]
  },
  {
    id: "9a5b1b06-cb15-499a-bea7-b19a0dc98073",
    businessId: "b6400d89-163e-4ef1-9a7c-f68a77507056",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // Twelve days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Middle Eastern Feast at Bavel",
    description: "Join us for a feast that spans the flavors of the Middle East with our exclusive dinner menu at Bavel.",
    suggestedItems: "Try the Lamb Neck Shawarma and Hummus.",
    availabilityStart: "17:00",
    availabilityEnd: "21:00",
    city: "Los Angeles",
    pricingType: "tiered",
    fixedOffer: "",
    tierOneOffer: 25000,
    tierTwoOffer: 15000,
    tierThreeOffer: 5000,
    maxTotalSpend: 1000000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "both",
    featuredImage: "/business/bavel.jpg",
    images: [
      "/promotions/bavel-1.jpg",
      "/promotions/bavel-2.jpg",
      "/promotions/bavel-3.jpg",
    ],
    tags: ["Feast", "Exotic", "Upscale"]
  },
  {
    id: "75289397-69df-4e01-baeb-1d437ac45d38",
    businessId: "e96d48b0-843a-4b2f-985e-ae7c831f54bf",
    promotionType: "dinner",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // Twenty days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Brazilian Vibes at Bossa Nova",
    description: "Experience the vibrant atmosphere and fusion flavors of Brazil with our special dinner offerings at Bossa Nova.",
    suggestedItems: "Try the Feijoada and Picanha Steak.",
    availabilityStart: "18:00",
    availabilityEnd: "23:00",
    city: "Los Angeles",
    pricingType: "tiered",
    fixedOffer: "",
    tierOneOffer: 25000,
    tierTwoOffer: 15000,
    tierThreeOffer: 5000,
    maxTotalSpend: 1000000,
    postDeliverable: "after",
    platform: "instagram",
    postType: "story",
    mediaType: "both",
    featuredImage: "/business/bossanova.jpg",
    images: [
      "/promotions/bossa-1.jpg",
      "/promotions/bossa-2.jpg",
      "/promotions/bossa-3.jpg",
    ],
    tags: ["Brazilian", "Fusion", "Vibrant"]
  }
];


module.exports = {
  users,
  creators,
  enrollment,
  businesses,
  creatorsignup,
  promotions,
  transactions
};
