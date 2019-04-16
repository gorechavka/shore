export interface Address {
  address: {
    country: string;
    state?: string;
    city?: string;
    town?: string;
    road?: string;
  };
  display_name: string;
}
