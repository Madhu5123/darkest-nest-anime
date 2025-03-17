
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  pricePerSqFt?: number;
  images: string[];
  beds: number;
  baths: number;
  area: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  propertyType: 'House' | 'Apartment' | 'Condo' | 'Townhouse' | 'Villa' | 'Land';
  yearBuilt: number;
  features: string[];
  garage?: number;
  lotSize?: number;
}

export interface PropertyFilter {
  search: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  propertyType: string;
}

// Firebase property interface
export interface FirebaseProperty {
  id: string;
  name: string;
  description: string;
  price: string;
  image_urls: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  area_points: {
    latitude: number;
    longitude: number;
  }[];
  email: string;
  phone: string;
  uploaded_at: string;
}

export interface FirebasePropertyFilter {
  search: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
}
