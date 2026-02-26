import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const toContact = () => {
    navigate("/contact");
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-full flex justify-between items-center h-fit py-4 px-8">
        <h1 className="text-2xl font-bold text-blue-400 text-shadow-md">
          MARCEL WANG
        </h1>
        <div className="flex gap-5">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/project">Project</Link>
          <Link to="/skill">Skill</Link>
        </div>
        <button
          onClick={toContact}
          className="py-2 px-3 bg-blue-400 rounded-md shadow-md font-bold text-white cursor-pointer hover:bg-blue-300"
        >
          Contact Me
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
