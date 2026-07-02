export const regions = {
  australia: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"],
  canada: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
  usa: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
} as const;

export const countries = {
  australia: {
    name: "Australia", shortName: "AU", currency: "USD", symbol: "$", flag: "🇦🇺",
    vinLabel: "VIN or Chassis Number", plateLabel: "Registration Number", regionLabel: "State or Territory",
    plans: { basic: 49, standard: 95, premium: 130 },
  },
  canada: {
    name: "Canada", shortName: "CA", currency: "USD", symbol: "$", flag: "🇨🇦",
    vinLabel: "VIN", plateLabel: "Licence Plate", regionLabel: "Province or Territory",
    plans: { basic: 49, standard: 95, premium: 130 },
  },
  usa: {
    name: "United States", shortName: "US", currency: "USD", symbol: "$", flag: "🇺🇸",
    vinLabel: "VIN", plateLabel: "License Plate", regionLabel: "State",
    plans: { basic: 49, standard: 95, premium: 130 },
  },
} as const;

export type CountryKey = keyof typeof countries;
export const countryKeys = Object.keys(countries) as CountryKey[];
export const isCountryKey = (value: string): value is CountryKey => countryKeys.includes(value as CountryKey);
