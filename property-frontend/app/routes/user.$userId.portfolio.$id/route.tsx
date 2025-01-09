import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPortfolios, getProperties } from "~/utils/api";
import type { LoaderArgs } from "@remix-run/node";
import type { Portfolio, Property } from "~/types";
import invariant from "tiny-invariant";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";
import MapIcon from "~/components/icons/map";
import { PropertyMap } from "./propertyMap.client";
import { PropertyList } from "./propertyList";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

type LoaderData = {
  portfolio: Portfolio | null;
  filteredProperties: Property[];
  userId: number;
};

export const loader = async ({ params }: LoaderArgs): Promise<LoaderData> => {
  invariant(params.id, "Portfolio ID is required");
  invariant(params.userId, "User ID is required");
  const userId = Number(params.userId);
  const portfolioId = Number(params.id);
  const [properties, portfolios] = await Promise.all([
    getProperties(),
    getPortfolios(),
  ]);

  const portfolio = portfolios.find((p) => p.id === portfolioId) || null;

  const filteredProperties = properties.filter(
    (property) => property.portfolio === portfolioId,
  );

  return { portfolio, filteredProperties, userId };
};

export default function PortfolioPage() {
  const { portfolio, filteredProperties, userId } = useLoaderData<LoaderData>();
  const [showAsMap, setShowAsMap] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8">
      <Button onClick={() => navigate(`/user/${userId}`)}>Back</Button>
      <h1 className="text-2xl font-bold mb-6">Portfolio: {portfolio?.name}</h1>
      <Button
        asChild
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <Link to={`create-property`}>Create property</Link>
      </Button>
      <h2 className="text-xl font-semibold mb-4">Properties</h2>
      <div className="flex mb-4">
        <MapIcon />
        <Switch
          id="showAsMap"
          label="Show as Map"
          checked={showAsMap}
          onCheckedChange={() => setShowAsMap(!showAsMap)}
        />
      </div>
      {showAsMap ? (
        <PropertyMap properties={filteredProperties} />
      ) : (
        <PropertyList filteredProperties={filteredProperties} />
      )}
    </div>
  );
}
