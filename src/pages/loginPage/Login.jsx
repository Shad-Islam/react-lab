import React from "react";

export default function Login() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen ">
        <form className="w-full max-w-sm flex flex-col">
          <input
            type="text"
            placeholder="Username"
            className="mb-4 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </section>
    </>
  );
}
