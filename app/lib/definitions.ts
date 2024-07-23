// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  type: string;
  email: string;
  password: string;
};

export type Creator = {
  id: string;
  name: string;
  email: string;
  city: string;
  instagram: string;
  tiktok: string;
  password: string;
};
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestPromotion = {
  id: string;
  name: string;
  business: string;
  promotionType: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestPromotionRaw = Omit<LatestPromotion, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export enum BusinessType {
  Bar = "Bar",
  Restaurant = "Restaurant",
  Hotel = "Hotel",
  Spa = "Spa",
}
export type Location = {
  address1: string,
  address2: string,
  city: string,
  state: string,
  zipcode: string,
}

export type Business = {
  id: string;
  businessType: BusinessType;
  promotions: string[];
  businessName: string;
  businessDescription: string;
  businessInstagram: string;
  businessTikTok: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  address: string,
  placesId: string,
  locationLat: string,
  locationLng: string,
  businessEmailAddress: string;
  businessPhoneNumber: string;
  featuredImage: string;
  tags: string[];
  updatedAt: string;
};

export type Promotion = {
  id: string;
  businessId: string;
  promotionType: string;
  startDate: string;
  endDate: string;
  quantity: number;
  title: string;
  description: string;
  tableSize: string;
  availabilityStart: string;
  availabilityEnd: string;
  suggestedItems: string;
  maxOfferPrice: number;
  minOfferPrice: number;
  platform: 'tiktok' | 'instagram';
  postType: 'reel' | 'story';
  featuredImage: string;
  images: string[];
  tags: string[];
  updatedAt: string;
};

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export type PromotionGrid = {
  id: string;
  businessId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  title: string;
  description: string;
  maxOfferPrice: number;
  minOfferPrice: number;
  platform: 'tiktok' | 'instagram';
  postType: 'reel' | 'story';
  featuredImage: string;
  placesId: string;
  locationLat: string;
  locationLng: string;
  images: string[];
  tags: string[];
  updatedAt: string;
};

export type PromotionTable = {
  id: string;
  promotionType: string;
  title: string;
  maxOfferPrice: string;
  startDate: string;
  endDate: string;
  quantity: number;
};

export type PromotionOptions = {
  id: string;
  name: string;
  values: string[];
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

