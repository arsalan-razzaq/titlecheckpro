export const plans = {
  basic: {
    name: "Basic Report", description: "Core vehicle identity and recorded-history checks.",
    recommended: false,
    features: ["VIN information", "Vehicle overview", "Vehicle specifications", "Registration or title information", "Theft record check", "Accident information", "Odometer information", "Safety recall information"],
  },
  standard: {
    name: "Standard Report", description: "A broader report for a more informed purchase decision.",
    recommended: true,
    features: ["Everything in Basic", "Registration region", "Ownership information", "Collision information", "Fire or damage indicators", "Ownership duration", "Major accident information", "Title or registration records", "Plate information", "Auction or sales history"],
  },
  premium: {
    name: "Premium Report", description: "Our most comprehensive configured report request.",
    recommended: false,
    features: ["Everything in Standard", "Altered or tampered record indicators", "Export information", "Airbag deployment information", "Reconstructed or refurbished indicators", "Vandalism information", "Salvage or total loss information", "Registration expiry information", "Engine information", "Water damage indicators", "Odometer rollback indicators"],
  },
} as const;

export type PlanKey = keyof typeof plans;
export const planKeys = Object.keys(plans) as PlanKey[];
export const isPlanKey = (value: string): value is PlanKey => planKeys.includes(value as PlanKey);
