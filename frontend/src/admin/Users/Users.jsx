import React, { useEffect, useState } from "react";
import Aheader from "../Header/Aheader";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/admin/total-Ausers");
        setUsers(res.data.users || []);
      } catch (error) {
        console.error("Fetch Users Error:", error);
        toast.error(
          error?.response?.data?.message || "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Aheader />

      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-[#042439] mb-6">
          Users Management
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border px-4 py-2 rounded-lg w-72 mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          {loading ? (
            <p className="p-6 text-gray-500">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="p-6 text-gray-500">No users found</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Joined</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.user_id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "instructor"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
