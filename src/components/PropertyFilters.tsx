
import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, X } from 'lucide-react';
import { Button } from './ui/button';
import { PropertyFilter } from '../types';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilter) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PropertyFilter>({
    search: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    propertyType: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  const resetFilters = () => {
    const resetFilters = {
      search: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: '',
      propertyType: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="w-full mb-8">
      {/* Search Bar - Always visible */}
      <div className="glass-morphism rounded-xl mb-4 overflow-hidden">
        <div className="flex items-center relative">
          <Search className="absolute left-4 text-white/70" size={20} />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Search properties by title, address, city..."
            className="pl-12 pr-4 py-3 w-full bg-transparent text-white focus:outline-none placeholder:text-white/50"
          />
          <Button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="absolute right-2 mr-1 glass-morphism hover:bg-white/10"
          >
            <SlidersHorizontal size={18} className="mr-2" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>

      {/* Filters - Toggleable */}
      <div 
        className={`glass-morphism rounded-xl overflow-hidden transition-all duration-300 ${
          isFilterOpen 
            ? 'max-h-[500px] opacity-100 mb-4' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-white/70 hover:text-white md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  placeholder="City, State, Zip"
                  className="pl-10 py-2 px-3 w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Price Range</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="py-2 px-3 w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                />
                <input
                  type="text"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="py-2 px-3 w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Beds & Baths</label>
              <div className="flex space-x-2">
                <select
                  name="beds"
                  value={filters.beds}
                  onChange={handleInputChange}
                  className="py-2 px-3 w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="">Beds</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
                <select
                  name="baths"
                  value={filters.baths}
                  onChange={handleInputChange}
                  className="py-2 px-3 w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="">Baths</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-3">
              <label className="text-sm text-white/70">Property Type</label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleInputChange}
                className="py-2 px-3 w-full bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
              >
                <option value="">All Property Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
            >
              Reset
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
