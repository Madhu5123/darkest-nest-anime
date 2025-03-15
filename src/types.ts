
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
