import { redirect } from "@remix-run/node";
import { deleteProperty, getProperties } from "~/utils/api";
import { useActionData, useLoaderData, useNavigate, Form } from "@remix-run/react";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/hooks/use-toast";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

// Loader for fetching property data
export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.id, "Property ID is required");

  const propertyId = Number(params.id);
  const properties = await getProperties();

  const property = properties.find((p) => p.id === propertyId) || null;

  return { property };
};

interface ActionData {
    error: string;
    }

// Action for handling property deletion
export const action = async ({ params }: ActionArgs): Promise<ActionData | Response> => {
    invariant(params.id, "Property ID is required");
  
    const propertyId = Number(params.id);
  
    try {
      await deleteProperty(propertyId);
      return redirect(`/portfolio/${params.portfolioId}`); 
    } catch (error) {
      console.error(error);
      return { error: "Failed to delete property. Please try again." };
    }
  };

export default function PropertyPage() {
  const { property } = useLoaderData();
  const actionData = useActionData();
  const { toast } = useToast();

  if (!property) {
    return (
      <div className="container mx-auto text-center p-8">
        <h1 className="text-2xl font-bold">Property Not Found</h1>
        <p className="text-gray-600">The requested property does not exist.</p>
      </div>
    );
  }

  // Show toast notification if there's an error
  if (actionData?.error) {
    toast({
      title: "Error",
      description: actionData.error,
      variant: "destructive",
    });
  }

  return (
    <div className="container mx-auto p-8">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <p className="text-gray-600 mb-6">
          {property.address}, {property.city} {property.zip_code}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>Estimated Value:</strong> NOK {property.estimated_value}
              </li>
              <li>
                <strong>Total Financial Risk:</strong> NOK {property.total_financial_risk}
              </li>
              <li>
                <strong>Relevant Risks:</strong> {property.relevant_risks}
              </li>
              <li>
                <strong>Handled Risks:</strong> {property.handled_risks}
              </li>
              <li>
                <strong>Coordinates:</strong> ({property.coordinates.lat}, {property.coordinates.lng})
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Map</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow">
              <iframe
                src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Property Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Form method="post">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Property
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
