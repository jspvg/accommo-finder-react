import { Accommodations } from "../types";

export const fetchAccommodations = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL);
    return response.json() as unknown as Accommodations;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};
