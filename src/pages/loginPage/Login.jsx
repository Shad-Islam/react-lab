import React from "react";
import users from "../../data/users";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTenents } from "../utility/fetchTenants";

export default function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) =>
        user.phone === formData.phone && user.password === formData.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const { data, isloading, isError, error } = useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenents,
  });
  if (isloading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data found</div>;
  }
  const tenants = data;
  console.log(tenants);

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen ">
        <form className="w-full max-w-sm flex flex-col" onSubmit={handelSubmit}>
          <input
            type="tel"
            placeholder="Phone Number"
            className="mb-4 p-2 border rounded"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 border rounded"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <select className="mb-4 p-2 border rounded">
            <option value="" hidden >
              Select Tenant ID
            </option>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 cursor-pointer transition duration-300"
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}
