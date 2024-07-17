// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
// const { BusinessType} = require("@/app/lib/definitions");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.ceil(number / 10) * 10;
}

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

const enrollment = [
  { promotionId: 'e6cf9e2f-1405-45e3-9c76-d62f25f80a7d', userId: '410544b2-4001-4271-9855-fec4b6a6442a', businessId: '1e082498-f20d-4db2-8119-5aa33e0529bc',  date: Date.now(), amount: 10000, status: "enrolled" },
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
    startDate: Date.now(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Two weeks from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "BBQ Bonanza at Bludso's",
    description: "Enjoy a mouthwatering BBQ feast at Bludso's BBQ, featuring our famous smoked meats and savory sides.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "instagram",
    postType: "reel",
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
    startDate: Date.now(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // Three weeks from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Crispy Treat at Honey's Kettle",
    description: "Dive into the crunch with Honey's Kettle Fried Chicken's special dinner promo, featuring our golden crispy chicken and homemade sides.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "tiktok",
    postType: "story",
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
    startDate: Date.now(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Ethiopian Delight at Meals by Genet",
    description: "Experience authentic Ethiopian dining with a special dinner offer at Meals by Genet, featuring communal plates and exotic flavors.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "instagram",
    postType: "reel",
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
    startDate: Date.now(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Ten days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Italian Nights at Jones Hollywood",
    description: "Indulge in our Italian-American classics with a twist during our special dinner nights at Jones Hollywood.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "instagram",
    postType: "reel",
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
    startDate: Date.now(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Fifteen days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Steak Night at Musso & Frank Grill",
    description: "Savor the taste of our premium steaks at Musso & Frank Grill with a special price offer on all steak dinners.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "tiktok",
    postType: "story",
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
    startDate: Date.now(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Korean Culinary Adventure at Danbi",
    description: "Explore the rich flavors of Korea with our special dinner menu featuring modern twists on traditional dishes at Danbi.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "instagram",
    postType: "reel",
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
    startDate: Date.now(),
    endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // Eighteen days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Interactive BBQ Fun at KTEAM BBQ",
    description: "Get your grill on with our interactive Korean BBQ experience. Cook your favorite meats to perfection at KTEAM BBQ.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "tiktok",
    postType: "story",
    featuredImage: "/business/kteam.jpg",
    images: [
      "https://example.com/images/kteambbq1.jpg",
      "https://example.com/images/kteambbq2.jpg",
      "https://example.com/images/kteambbq3.jpg"
    ],
    tags: ["BBQ", "Interactive", "Fun"]
  },
  {
    id: "9a5b1b06-cb15-499a-bea7-b19a0dc98073",
    businessId: "b6400d89-163e-4ef1-9a7c-f68a77507056",
    promotionType: "dinner",
    startDate: Date.now(),
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // Twelve days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Middle Eastern Feast at Bavel",
    description: "Join us for a feast that spans the flavors of the Middle East with our exclusive dinner menu at Bavel.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "instagram",
    postType: "reel",
    featuredImage: "/business/bavel.jpg",
    images: [
      "https://example.com/images/bavel1.jpg",
      "https://example.com/images/bavel2.jpg",
      "https://example.com/images/bavel3.jpg"
    ],
    tags: ["Feast", "Exotic", "Upscale"]
  },
  {
    id: "75289397-69df-4e01-baeb-1d437ac45d38",
    businessId: "e96d48b0-843a-4b2f-985e-ae7c831f54bf",
    promotionType: "dinner",
    startDate: Date.now(),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // Twenty days from now
    quantity: Math.floor(Math.random() * 100) + 1,
    title: "Brazilian Vibes at Bossa Nova",
    description: "Experience the vibrant atmosphere and fusion flavors of Brazil with our special dinner offerings at Bossa Nova.",
    city: "Los Angeles",
    maxOfferPrice: getRandomInt(250,1000),
    minOfferPrice:  getRandomInt(50,200),
    platform: "tiktok",
    postType: "story",
    featuredImage: "/business/bossanova.jpg",
    images: [
      "https://example.com/images/bossanova1.jpg",
      "https://example.com/images/bossanova2.jpg",
      "https://example.com/images/bossanova3.jpg"
    ],
    tags: ["Brazilian", "Fusion", "Vibrant"]
  }
];

//
// const promotions2 = [
//   {
//     id: "e6cf9e2f-1405-45e3-9c76-d62f25f80a7d",
//     businessId: "1e082498-f20d-4db2-8119-5aa33e0529bc",
//     promotionType: "dinner",
//     startDate: Date.now(),
//     endDate: Date.now(),
//     quantity: 50,
//     title: "Dinner At Carbone",
//     description: "Dinner for you and a few friends",
//     city: "New York",
//     maxOfferPrice:10000,
//     minOfferPrice: 7500,
//     platform: 'instagram',
//     postType: 'reel',
//     featuredImage: "/business/carbone.jpg",
//     images: ["https://static01.nyt.com/images/2013/03/06/dining/06CARBONE1_SPAN/06CARBONE1-jumbo.jpg?quality=75&auto=webp", "https://www.carbonenewyork.com/assets/images/slides/carbone_spicy-rigatoni_4_optimized.jpg", "https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_640,ar_4:3,g_center,f_auto/cms/media/reviews/carbone/banners/carbone-1005_0"],
//     tags: ["carbone", "dinner", "new york"],
//   },
//   {
//     id: "b7c74193-1f62-454b-9b9b-f3eabedc3fc6",
//     businessId: "781b52ae-1a4a-4f89-a571-cb113c8d6537",
//     promotionType: "bar",
//     startDate: Date.now(),
//     endDate: Date.now(),
//     quantity: 50,
//     title: "Night Out At The Den",
//     description: "Grab some Brekkie with the gang",
//     city: "New York",
//     maxOfferPrice:10000,
//     minOfferPrice: 7500,
//     platform: 'instagram',
//     postType: 'reel',
//     featuredImage: "/business/densunset.jpg",
//     images: ["https://images.getbento.com/accounts/cff17e6e6723fb0788c72761293da229/media/images/61578JakobLayman.1122.TheDen_365.jpg?w=1200&fit=crop&auto=compress,format&crop=focalpoint&fp-x=0.5&fp-y=0.5", "https://images.getbento.com/accounts/cff17e6e6723fb0788c72761293da229/media/images/16072JakobLayman.1122.TheDen_360.jpg?w=1200&fit=crop&auto=compress,format&crop=focalpoint&fp-x=0.5&fp-y=0.5", "https://images.getbento.com/accounts/cff17e6e6723fb0788c72761293da229/media/images/16524JakobLayman.1122.TheDen_352.jpg?w=1200&fit=crop&auto=compress,format&crop=focalpoint&fp-x=0.5&fp-y=0.5"],
//     tags: ["Night Out", "Bar", "LA"],
//   },
//   {
//     id: "c2e9f61c-cfb8-47f1-a1c0-d12eee6a1647",
//     businessId: "b50426b3-3651-4de0-a299-e576e19e86f8",
//     promotionType: "dinner",
//     startDate: Date.now(),
//     endDate: Date.now(),
//     quantity: 50,
//     title: "Dinner At Papi Steak",
//     description: "Dinner for you and a few friends",
//     city: "Miami",
//     maxOfferPrice:10000,
//     minOfferPrice: 7500,
//     platform: 'instagram',
//     postType: 'reel',
//     featuredImage: "/business/papisteak.jpg",
//     images: ["https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,w_1600/crm/miamifl/papiedit3_6EDDAC28-5056-A36A-0BA8AC3C1BD96770-6eddab435056a36_6eddac91-5056-a36a-0b206520dbcbc9b2.jpg", "https://c8a6x6i3.rocketcdn.me/wp-content/uploads/2022/12/Papi_Miami4.jpg", "https://c8a6x6i3.rocketcdn.me/wp-content/uploads/2022/12/Papi_Miami.jpg"],
//     tags: ["papi", "dinner", "miami"],
//   },
//   {
//     id: "c0e56323-30af-4243-a4a1-73c57f6ad7f0",
//     businessId: "3f38c6b8-0d11-4e4b-8d36-ec16162859c9",
//     promotionType: "dinner",
//     startDate: 1679395200000,
//     endDate: 1679481600000,
//     quantity: 100,
//     title: "Brunch at The Breakfast Club",
//     description: "Enjoy a delightful brunch with your loved ones",
//     city: "London",
//     maxOfferPrice: 2500,
//     minOfferPrice: 2000,
//     platform: "instagram",
//     postType: "reel",
//     featuredImage: "/business/breakfastclub.jpg",
//     images: [
//       "https://www.restaurantonline.co.uk/var/wrbm_gb_hospitality/storage/images/_aliases/wrbm_large/publications/hospitality/restaurantonline.co.uk/casual-dining/the-breakfast-club-tees-up-third-soho-site/6227771-1-eng-GB/The-Breakfast-Club-tees-up-third-Soho-site.png",
//       "https://assets3.thrillist.com/v1/image/1244754/414x310/crop;webp=auto;jpeg_quality=60;progressive.jpg",
//       "https://cdn.vox-cdn.com/thumbor/Vr7CMOVlsQrOPIFFdt9iL61fV4s=/0x104:1428x852/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19098665/breakfast_club_full_English.jpg"
//     ],
//     tags: ["brunch", "London", "food"]
//   },
//   {
//     id: "d9967a03-a51a-4270-b535-f3d95bf1a024",
//     businessId: "b1b519d0-f3f1-4a76-8f32-06c7068ff1ac",
//     promotionType: "dinner",
//     startDate: 1679395200000,
//     endDate: 1679481600000,
//     quantity: 75,
//     title: "Experience Elevated: Cocktail Hour",
//     description: "Discover the ultimate in luxury and sophistication at our exclusive Cocktail Hour hosted at Sky Bar, Dubai's premier destination for elevated experiences. Here at Sky Bar, we redefine the art of mixology amidst stunning panoramic views of the iconic Dubai skyline. Indulge in a handcrafted selection of signature cocktails meticulously crafted by our expert mixologists. Each sip is a journey of flavors, blending premium spirits with fresh ingredients and innovative techniques. Whether you prefer classic concoctions or crave something uniquely crafted, our menu promises to tantalize your taste buds. Set against the backdrop of Dubai's glittering skyscrapers and the azure sky, Sky Bar offers an unrivaled ambiance. The setting sun casts a golden glow over the city, transforming the landscape into a mesmerizing canvas. Take in the sights from our exclusive rooftop terrace, where every angle is a picture-perfect moment.",
//     city: "Dubai",
//     maxOfferPrice: 8000,
//     minOfferPrice: 6000,
//     platform: "tiktok",
//     postType: "video",
//     featuredImage: "/business/skybar.jpg",
//     images: [
//       "https://www.designamericafurniture.com/i/burj-al-arab-restaurants-skyview-bar-01-hero-1-1.jpg",
//       "https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/restaurants/dubai/burj-al-arab-skyview-bar-and-restaurant/restaurant-gallery/skyview-interior-1.jpg?h=1080&w=1620&modified=20220705080147",
//       "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/38/2e/9b.jpg"
//     ],
//     tags: ["cocktails", "Dubai", "sky bar"]
//   },
//   {
//     id: "3b508ec3-1a7c-4e6a-a2d7-770b43fb3749",
//     businessId: "f0c51f16-b154-40eb-b8d2-c1179df34ed1",
//     promotionType: "dinner",
//     startDate: 1679395200000,
//     endDate: 1679481600000,
//     quantity: 50,
//     title: "Sushi Night at Sake Club",
//     description: "Indulge in a variety of exquisite sushi rolls",
//     city: "Tokyo",
//     maxOfferPrice: 12000,
//     minOfferPrice: 10000,
//     platform: "instagram",
//     postType: "story",
//     featuredImage: "/business/sakeclub.jpg",
//     images: [
//       "https://cdn-az.allevents.in/events6/banners/53dc20441266cd50d542203d85181f7ce26281d00e9f5e4a4a3bbf8a8cb52f84-rimg-w960-h640-gmir.jpg?v=1710480626",
//       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/506417509.jpg?k=b3feb304d9eb735a9c5d72369942a85c4560656b32753ed32172c30e82b9aea6&o=&hp=1",
//       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/506418920.jpg?k=ab868d1bd223087bbeea67c0229cb375de445ac02b66ce8095cdd54f5375adb3&o=&hp=1"
//     ],
//     tags: ["sushi", "Tokyo", "nightlife"]
//   }
// ]

module.exports = {
  users,
  creators,
  enrollment,
  businesses,
  promotions
};
