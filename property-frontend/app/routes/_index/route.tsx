import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { getUsers } from "~/utils/api";
import { User } from "~/types/user";
import { Button } from "~/components/ui/button";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const users = await getUsers();
  return users;
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const users = useLoaderData<User[]>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const userExists = users.filter((user) => user.username === username);

    if (userExists.length === 1) {
      // Redirect to portfolios page if user is valid
      navigate(`/user/${userExists[0].id}`);
    } else {
      setError("Invalid username. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login page</h1>
        <form onSubmit={handleLogin}>
          <label className="block mb-4">
            <span className="text-gray-700">Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your username"
              required
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
