import { Link, useLoaderData } from "@remix-run/react";
import { getPortfolios } from "~/utils/api";
import { Portfolio } from "~/types/portfolio";
import invariant from "tiny-invariant";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing user ID");
  const portfolios = await getPortfolios();

  return portfolios.filter((portfolio) => {
    return portfolio.users.some((user) => user.id === Number(params.id));
  });
};

export default function PortfoliosPage() {
  const portfolios = useLoaderData<Portfolio[]>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Portfolios</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>
            <Link
              to={`/portfolio/${portfolio.id}`}
              className="block border p-4 rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition"
            >
              <h2 className="text-lg font-bold">{portfolio.name}</h2>
              <p className="text-gray-600">
                Users: {portfolio.users.map((user) => user.username).join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
