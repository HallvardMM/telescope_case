import { Form, useActionData, useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { createProperty } from "~/utils/api";
import type { ActionArgs } from "@remix-run/node";
import { useToast } from "~/hooks/use-toast";
import { useEffect } from "react";

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const portfolioId = params.portfolioId;
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
    await createProperty(propertyData); // Call API to create property
    return redirect(`/portfolio/${portfolioId}`);
  } catch (error) {
    console.error(error);
    return { error: "Failed to create property. Please try again." };
  }
};

export default function CreatePropertyPage() {
  const actionData = useActionData();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Show toast notification for errors
  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "Error",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData, toast]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create Property</h1>
      <Form method="post" className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="lat"
          placeholder="Latitude"
          required
          step="any"
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="lng"
          placeholder="Longitude"
          required
          step="any"
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="estimated_value"
          placeholder="Estimated Value (NOK)"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="relevant_risks"
          placeholder="Relevant Risks"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="handled_risks"
          placeholder="Handled Risks"
          required
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          name="total_financial_risk"
          placeholder="Total Financial Risk (NOK)"
          required
          className="border p-2 rounded-lg"
        />
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate(-1)} // Go back to the portfolio page
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Property
          </button>
        </div>
      </Form>
    </div>
  );
}
