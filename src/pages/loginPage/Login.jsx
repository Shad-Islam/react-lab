import React from "react";
import users from "../../data/users";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 cursor-pointer transition duration-300">
            Login
          </button>
        </form>
      </section>
    </>
  );
}
