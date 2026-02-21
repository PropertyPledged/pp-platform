// Property type definitions
export const PROPERTY_CATEGORIES = [
   { value: 'residential', label: 'Residential' },
   { value: 'commercial', label: 'Commercial' },
] as const

export const RESIDENTIAL_PROPERTY_TYPES = [
   { value: 'detached', label: 'Detached House' },
   { value: 'semi-detached', label: 'Semi-Detached House' },
   { value: 'terraced', label: 'Terraced House' },
   { value: 'end-terrace', label: 'End of Terrace' },
   { value: 'bungalow', label: 'Bungalow' },
   { value: 'cottage', label: 'Cottage' },
   { value: 'town-house', label: 'Town House' },
   { value: 'flat', label: 'Flat/Apartment' },
   { value: 'maisonette', label: 'Maisonette' },
   { value: 'studio', label: 'Studio Flat' },
   { value: 'penthouse', label: 'Penthouse' },
   { value: 'park-home', label: 'Park Home' },
   { value: 'houseboat', label: 'Houseboat' },
] as const

export const COMMERCIAL_PROPERTY_TYPES = [
   { value: 'office', label: 'Office' },
   { value: 'retail', label: 'Retail/Shop' },
   { value: 'restaurant', label: 'Restaurant/Café' },
   { value: 'pub', label: 'Pub/Bar' },
   { value: 'industrial', label: 'Industrial/Warehouse' },
   { value: 'hotel', label: 'Hotel/Guest House' },
   { value: 'mixed-use', label: 'Mixed Use' },
] as const

export const getPropertyTypesByCategory = (category: string) => {
   switch (category) {
      case 'residential':
         return RESIDENTIAL_PROPERTY_TYPES
      case 'commercial':
         return COMMERCIAL_PROPERTY_TYPES
      default:
         return []
   }
}
