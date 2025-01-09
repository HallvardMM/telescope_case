import { Link } from "@remix-run/react";
import { Doughnut } from "react-chartjs-2";
import { Property } from "~/types/property";

interface PropertyListProps {
  filteredProperties: Property[];
}

export const PropertyList = ({ filteredProperties }: PropertyListProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredProperties.map((property) => {
        // Prepare Doughnut Chart data for each property
        const doughnutData = {
          labels: ["Handled Risks", "Unhandled Risks"],
          datasets: [
            {
              data: [
                property.handled_risks,
                property.relevant_risks - property.handled_risks,
              ],
              backgroundColor: ["#4caf50", "#f44336"], // Green for handled, Red for unhandled
              hoverBackgroundColor: ["#45a049", "#e53935"],
              borderWidth: 1,
            },
          ],
        };

        return (
          <li
            key={property.id}
            className="block border p-4 rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition"
          >
            <Link to={`/property/${property.id}`} className="flex">
              <div>
                <h3 className="text-lg font-bold">{property.name}</h3>
                <p className="text-gray-600">
                  Total Financial Risk:{" "}
                  {property.total_financial_risk.toLocaleString()} NOK
                </p>
                <p className="text-gray-600">
                  Risks: {property.handled_risks}/{property.relevant_risks}
                </p>
              </div>
            </Link>
            <div className="block border p-4 rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition">
              <div className="mt-4 size-60">
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
