import axios from "axios";
import { User, Portfolio, Property } from "./types";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const api = axios.create({
  baseURL: BASE_URL,
});

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("users/");
  return response.data;
};

// Fetch all portfolios
export const getPortfolios = async (): Promise<Portfolio[]> => {
  const response = await api.get<Portfolio[]>("portfolios/");
  return response.data;
};

export const getProperties = async (): Promise<Property[]> => {
  const response = await api.get<Property[]>("properties/");
  return response.data;
};

interface CreatePortfolioPayload {
  name: string;
  user_ids?: number[]; // Optional array of user IDs to associate
}
// Create a new portfolio
export const createPortfolio = async (
  data: CreatePortfolioPayload,
): Promise<Portfolio> => {
  const response = await api.post<Portfolio>("portfolios/", data);
  return response.data;
};

export const deleteProperty = async (propertyId: number) => {
  await axios.delete(`${BASE_URL}properties/${propertyId}/`);
};

export const deletePortfolio = async (portfolioId: number) => {
  await axios.delete(`${BASE_URL}portfolios/${portfolioId}/`);
};

export const createProperty = async (propertyData: Property) => {
  try {
    const response = await axios.post(`${BASE_URL}properties/`, propertyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw new Error("Failed to create property");
  }
};
