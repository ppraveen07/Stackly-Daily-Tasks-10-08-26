import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import type { User } from "../types/User";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("All");

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();

        console.log("Users API Response:", data);

        setUsers(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Unable to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const cities: string[] = [
    "All",
    ...Array.from(
      new Set(users.map((user) => user.address.city))
    ),
  ];

  const filteredUsers: User[] = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCity =
      selectedCity === "All" ||
      user.address.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>User Directory</h1>
          <p>Browse and search users from our directory</p>
        </div>

        <div className="user-count">
          {users.length} Users
        </div>
      </div>

      <div className="filters">
        <SearchBar
          search={search}
          onSearchChange={setSearch}
        />

        <select
          className="city-select"
          value={selectedCity}
          onChange={(event) =>
            setSelectedCity(event.target.value)
          }
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city === "All" ? "All Cities" : city}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="status-container">
          <div className="loader"></div>
          <p>Loading users...</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading &&
        !error &&
        filteredUsers.length === 0 && (
          <div className="empty-container">
            <div className="empty-icon">🔍</div>
            <h2>No Users Found</h2>
            <p>
              Try changing your search or city filter.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredUsers.length > 0 && (
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default Users;