import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTenents } from "../utility/fetchTenants";

export default function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    tenantId: "",
  });
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    const user = {
      phone: formData.phone,
      password: formData.password,
      tenantId: formData.tenantId,
    };

    console.log(user);
    authenticateUser(user);
  };

  const authenticateUser = async (user) => {
    const { tenantId, ...rest } = user;
    const base_url = "http://localhost:8080";
    const login_url = `${base_url}/tenant/${tenantId}/login`;

    try {
      const response = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate user");
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.first_name);
      navigate("/dashboard");
      return data;
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };
  // Fetch tenants using react-query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenents,
  });
  if (isLoading) {
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
          <select
            className="mb-4 p-2 border rounded"
            value={formData.tenantId}
            onChange={(e) =>
              setFormData({ ...formData, tenantId: e.target.value })
            }
            required
          >
            <option value="" hidden>
              Select Tenant ID
            </option>
            {tenants.map((tenant) => (
              <option key={tenant._id} value={tenant._id}>
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
