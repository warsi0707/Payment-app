import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../provider/BackendUrl";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const GetUser = async () => {
      const response = await fetch(`${BackendUrl}/user/bulk?filter=` + filter, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")
        }
      });
      const result = await response.json();
      if (response.ok) {
        setUsers(result.data);
      }
    };
    GetUser();
  }, [filter]);
  return (
    <div className="h-full py-10 my-10 space-y-2">
      <h1 className="text-lg font-bold">Users</h1>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-1 px-2 mb-5 bg-gray-200 border border-gray-500 rounded-md"
        type="text"
        placeholder="Search users..."
      />
      {users.map((item) => (
        <div
          key={item._id}
          className="flex flex-row items-center justify-between "
        >
          <div className="flex gap-2 mt-5 sm:text-xl">
            <p className="items-center px-3 py-1 bg-gray-400 rounded-full">
              {item.firstName[0].toUpperCase()}
            </p>
            <h1 className="mt-1">
              {item.firstName} {item.lastName}
            </h1>
          </div>
          <div>
            <button
              onClick={() => {
                navigate(`/send?id=${item._id}&name=${item.firstName}`);
              }}
              className="p-1 mt-5 text-white bg-black rounded-md md:text-xl"
            >
              Send money
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
