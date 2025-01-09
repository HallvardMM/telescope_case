import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { createProperty } from "~/utils/api";
import { fetchAddressFromCoordinates } from "./kartverketApi";
import { useToast } from "~/hooks/use-toast";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import MapSelector from "./mapSelector.client";
import invariant from "tiny-invariant";

type LoaderData = {
  userId: number;
  portfolioId: number;
};

export const loader = async ({ params }): Promise<LoaderData> => {
  invariant(params.userId, "User ID is required");
  invariant(params.portfolioId, "Portfolio ID is required");

  return {
    userId: Number(params.userId),
    portfolioId: Number(params.portfolioId),
  };
};

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const portfolioId = params.portfolioId;
  const userId = params.userId;

  const propertyData = {
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    zip_code: formData.get("zip_code"),
    coordinates: {
      lat: Number(formData.get("lat")),
      lng: Number(formData.get("lng")),
    },
    estimated_value: Number(formData.get("estimated_value")),
    relevant_risks: Number(formData.get("relevant_risks")),
    handled_risks: Number(formData.get("handled_risks")),
    total_financial_risk: Number(formData.get("total_financial_risk")),
    portfolio: Number(portfolioId),
  };

  try {
    await createProperty(propertyData);
    return redirect(`/user/${userId}/portfolio/${portfolioId}`);
  } catch (error) {
    console.error(error);
    return { error: "Failed to create property. Please try again." };
  }
};

export default function CreatePropertyPage() {
  const actionData = useActionData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userId, portfolioId } = useLoaderData<LoaderData>();

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [addressFields, setAddressFields] = useState({
    address: "",
    city: "",
    zip_code: "",
  });

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Error",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData, toast]);

  const handleCoordinatesChange = async (lat: number, lng: number) => {
    setCoordinates({ lat, lng });

    const addressData = await fetchAddressFromCoordinates(lat, lng);

    if (addressData?.adresser?.length === 1) {
      const address = addressData.adresser[0];
      setAddressFields({
        address: address.adressenavn + " " + address.nummer + address.bokstav || "",
        city: address.poststed || "",
        zip_code: address.postnummer || "",
      });
      toast({
        title: "Address Found",
        description: `Autofilled address: ${address.adressetekst}`,
      });
    } else if (addressData?.adresser?.length > 1) {
      toast({
        title: "Multiple Addresses Found",
        description: "Please refine the location or manually enter the address.",
      });
    } else {
      toast({
        title: "No Address Found",
        description: "Unable to find an address for the selected location.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Button
        onClick={() => navigate(`/user/${userId}/portfolio/${portfolioId}`)}
        className="mb-4"
      >
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">Create Property</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <Form method="post" className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Property Name"
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={addressFields.address}
              onChange={(e) =>
                setAddressFields({ ...addressFields, address: e.target.value })
              }
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={addressFields.city}
              onChange={(e) =>
                setAddressFields({ ...addressFields, city: e.target.value })
              }
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <input
              type="text"
              name="zip_code"
              placeholder="Zip Code"
              value={addressFields.zip_code}
              onChange={(e) =>
                setAddressFields({ ...addressFields, zip_code: e.target.value })
              }
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              value={coordinates.lat}
              readOnly
              className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-black"
            />
            <input
              type="number"
              name="lng"
              placeholder="Longitude"
              value={coordinates.lng}
              readOnly
              className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-black"
            />
            <input
              type="number"
              name="estimated_value"
              placeholder="Estimated Value (NOK)"
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <input
              type="number"
              name="relevant_risks"
              placeholder="Relevant Risks"
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <input
              type="number"
              name="handled_risks"
              placeholder="Handled Risks"
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <input
              type="number"
              name="total_financial_risk"
              placeholder="Total Financial Risk (NOK)"
              required
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-black"
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/user/${userId}/portfolio/${portfolioId}`)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Property</Button>
            </div>
          </Form>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/2">
          <MapSelector onSelectCoordinates={handleCoordinatesChange} />
        </div>
      </div>
    </div>
  );
}
