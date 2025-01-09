export const fetchAddressFromCoordinates = async (lat: number, lon: number) => {
    const radius = 10; // Radius in meters
    const url = `https://ws.geonorge.no/adresser/v1/punktsok?lat=${lat}&lon=${lon}&radius=${radius}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch address from coordinates");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  