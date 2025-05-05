import React from "react";

export default function Dashboard() {
  let userName = localStorage.getItem("name");
  return (
    <>
      <h2 className="text-2xl text-center">Welcome to the Dashboard!</h2>
      <p className="mt-2 text-center">Welcome {userName}</p>
    </>
  );
}
