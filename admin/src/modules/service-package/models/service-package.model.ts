export const SERVICE_PACKAGE_CATEGORIES = [
  "wedding",
  "corporate",
  "celebration",
  "private_dining",
] as const;

export type ServicePackageCategory =
  (typeof SERVICE_PACKAGE_CATEGORIES)[number];

export type AdminServicePackage = {
  publicId: string;
  name: string;
  description: string;
  priceLabel: string;
  basePrice: number | null;
  imageUrl: string;
  category: ServicePackageCategory;
  features: string[];
  minGuests: number | null;
  maxGuests: number | null;
  serviceDuration: string;
  venueScope: string;
  defaultMenu: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type AdminCreateServicePackageInput = {
  name: string;
  description: string;
  priceLabel?: string;
  basePrice?: number;
  imageUrl: string;
  category: ServicePackageCategory;
  features?: string[];
  minGuests?: number;
  maxGuests?: number;
  serviceDuration?: string;
  venueScope?: string;
  defaultMenu?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  sortOrder?: number;
};

export type AdminUpdateServicePackageInput = Partial<
  AdminCreateServicePackageInput
>;
