
import { Property } from '../types';

// Mock data for properties
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa with Ocean View',
    description: 'This stunning modern villa offers breathtaking ocean views from its expansive windows and multiple terraces. Featuring an open floor plan, high ceilings, and premium finishes throughout, this property represents the pinnacle of luxury coastal living. The gourmet kitchen includes top-of-the-line appliances, and the master suite provides a private retreat with spa-like bathroom. Outside, enjoy the infinity pool that appears to merge with the ocean horizon.',
    price: 1250000,
    pricePerSqFt: 625,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257592-4a9a32f9734e?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop'
    ],
    beds: 4,
    baths: 3.5,
    area: 2000,
    location: {
      address: '123 Oceanview Dr',
      city: 'Malibu',
      state: 'CA',
      zip: '90265',
      coordinates: {
        lat: 34.025922,
        lng: -118.779757
      }
    },
    status: 'For Sale',
    propertyType: 'Villa',
    yearBuilt: 2020,
    features: [
      'Ocean View',
      'Swimming Pool',
      'Home Automation',
      'Smart Security',
      'Floor-to-Ceiling Windows',
      'Private Garden',
      'Designer Kitchen',
      'Walk-in Closets',
      'Marble Bathrooms',
      'Heated Floors'
    ],
    garage: 2,
    lotSize: 5000
  },
  {
    id: '2',
    title: 'Spacious Contemporary Downtown Loft',
    description: 'This spectacular downtown loft combines industrial charm with modern luxury. The open-concept layout features soaring ceilings, exposed brick walls, and oversized windows that flood the space with natural light. The chef\'s kitchen includes a large island, premium appliances, and custom cabinetry. A floating staircase leads to the mezzanine level with a flexible space that can serve as a home office, guest room, or additional living area. Located in the heart of the arts district, you\'ll be steps from galleries, restaurants, and nightlife.',
    price: 899000,
    pricePerSqFt: 560,
    images: [
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753104-685f4b68cf42?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600697461213-ad6f3dfeb250?q=80&w=2576&auto=format&fit=crop'
    ],
    beds: 2,
    baths: 2,
    area: 1600,
    location: {
      address: '456 Arts District Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90013',
      coordinates: {
        lat: 34.0403,
        lng: -118.2351
      }
    },
    status: 'For Sale',
    propertyType: 'Apartment',
    yearBuilt: 2015,
    features: [
      'High Ceilings',
      'Exposed Brick',
      'Hardwood Floors',
      'Stainless Steel Appliances',
      'Walk-in Shower',
      'Central Air',
      'In-unit Laundry',
      'Fitness Center',
      'Rooftop Terrace',
      'Pet Friendly'
    ],
    garage: 1,
    lotSize: 0
  },
  {
    id: '3',
    title: 'Elegant Suburban Family Home',
    description: 'This impeccably maintained colonial-style home offers the perfect blend of traditional elegance and modern comfort for families. Set on a quiet, tree-lined street in a top-rated school district, this spacious residence features formal living and dining areas, a gourmet eat-in kitchen, and a cozy family room with a fireplace. The primary suite includes a sitting area, walk-in closet, and luxury bathroom. The finished basement adds additional living space with a recreation room, home theater, and guest suite. The beautifully landscaped backyard features a patio, BBQ area, and plenty of space for children to play.',
    price: 875000,
    pricePerSqFt: 291,
    images: [
      'https://images.unsplash.com/photo-1630650231815-a567e2ed26cc?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560184897-502a475f7a0d?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop'
    ],
    beds: 5,
    baths: 3.5,
    area: 3000,
    location: {
      address: '789 Maple Avenue',
      city: 'Westfield',
      state: 'NJ',
      zip: '07090',
      coordinates: {
        lat: 40.6514,
        lng: -74.3476
      }
    },
    status: 'For Sale',
    propertyType: 'House',
    yearBuilt: 2005,
    features: [
      'Hardwood Floors',
      'Crown Molding',
      'Double-pane Windows',
      'Recessed Lighting',
      'Granite Countertops',
      'Stainless Steel Appliances',
      'Walk-in Closets',
      'Master Suite',
      'Finished Basement',
      'Fenced Yard'
    ],
    garage: 2,
    lotSize: 8000
  },
  {
    id: '4',
    title: 'Modern Penthouse with City Views',
    description: 'Experience the epitome of urban luxury in this stunning penthouse apartment that offers panoramic views of the city skyline. This corner unit features floor-to-ceiling windows, an open floor plan, and high-end finishes throughout. The gourmet kitchen is equipped with custom cabinetry, quartz countertops, and premium appliances. The expansive primary suite includes a spa-inspired bathroom with a soaking tub and a walk-in rain shower. Two private terraces provide perfect spaces for outdoor entertaining while enjoying the breathtaking views. Building amenities include 24-hour concierge, fitness center, resident lounge, and rooftop pool.',
    price: 1750000,
    pricePerSqFt: 875,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=2669&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop'
    ],
    beds: 3,
    baths: 2.5,
    area: 2000,
    location: {
      address: '101 Skyline Tower',
      city: 'Chicago',
      state: 'IL',
      zip: '60602',
      coordinates: {
        lat: 41.8839,
        lng: -87.6270
      }
    },
    status: 'For Sale',
    propertyType: 'Condo',
    yearBuilt: 2018,
    features: [
      'City Views',
      'Private Terraces',
      'Floor-to-Ceiling Windows',
      'Smart Home Technology',
      'Custom Lighting',
      'Wine Refrigerator',
      'Waterfall Island',
      'Heated Bathroom Floors',
      'Custom Closets',
      'Sound System'
    ],
    garage: 2,
    lotSize: 0
  },
  {
    id: '5',
    title: 'Charming Victorian in Historic District',
    description: 'This beautifully restored Victorian home combines historic charm with modern amenities. Located in a designated historic district, this property features original architectural details including hardwood floors, crown moldings, ceiling medallions, and stained glass windows. The updated kitchen maintains the period aesthetic while offering modern functionality with a farmhouse sink, marble countertops, and professional-grade appliances. The inviting wrap-around porch provides a perfect setting for enjoying morning coffee or evening cocktails. Updates include new HVAC, electrical, and plumbing systems, ensuring modern comfort in this historic gem.',
    price: 950000,
    pricePerSqFt: 396,
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2670&auto=format&fit=crop'
    ],
    beds: 4,
    baths: 2.5,
    area: 2400,
    location: {
      address: '234 Heritage Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94117',
      coordinates: {
        lat: 37.7694,
        lng: -122.4862
      }
    },
    status: 'For Sale',
    propertyType: 'House',
    yearBuilt: 1895,
    features: [
      'Original Hardwood Floors',
      'Crown Molding',
      'Ceiling Medallions',
      'Stained Glass Windows',
      'Clawfoot Tub',
      'Fireplace',
      'Wrap-around Porch',
      'Bay Windows',
      'Updated Systems',
      'Period Lighting'
    ],
    garage: 0,
    lotSize: 3500
  },
  {
    id: '6',
    title: 'Minimalist Scandinavian-inspired Townhouse',
    description: 'This contemporary townhouse embraces the clean lines and functional aesthetics of Scandinavian design. The light-filled interior features white walls, blonde wood floors, and large windows that create a sense of spaciousness. The well-designed floor plan includes an efficient kitchen with integrated appliances, comfortable living areas, and bedrooms that serve as tranquil retreats. Smart storage solutions throughout maximize the use of space. Energy-efficient features include triple-pane windows, enhanced insulation, and a heat recovery ventilation system. Located in a walkable neighborhood with easy access to public transportation, shops, and restaurants.',
    price: 685000,
    pricePerSqFt: 428,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2684&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop'
    ],
    beds: 3,
    baths: 2.5,
    area: 1600,
    location: {
      address: '567 Urban Lane',
      city: 'Portland',
      state: 'OR',
      zip: '97209',
      coordinates: {
        lat: 45.5266,
        lng: -122.6880
      }
    },
    status: 'For Sale',
    propertyType: 'Townhouse',
    yearBuilt: 2019,
    features: [
      'Energy Efficient',
      'Radiant Floor Heating',
      'Smart Home System',
      'Built-in Storage',
      'Integrated Appliances',
      'Triple-pane Windows',
      'Heat Recovery Ventilation',
      'Sustainable Materials',
      'Rooftop Deck',
      'Electric Car Charging'
    ],
    garage: 1,
    lotSize: 1200
  }
];
