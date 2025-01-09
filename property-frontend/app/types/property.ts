interface Coordinates {
  lat: number;
  lng: number;
}

export interface Property {
  id: number;
  address: string;
  zip_code: string;
  city: string;
  coordinates: Coordinates;
  name: string;
  estimated_value: number;
  relevant_risks: number;
  handled_risks: number;
  total_financial_risk: number;
  portfolio: number;
}
