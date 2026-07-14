export const SERVICE_PACKAGE_CATEGORIES = [
  'wedding',
  'corporate',
  'celebration',
  'private_dining',
] as const;

export type ServicePackageCategory =
  (typeof SERVICE_PACKAGE_CATEGORIES)[number];
