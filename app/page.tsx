import React from "react";
import DenialAnalysisDashboard from "../components/DenialAnalysisDashboard";

const Page = () => {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <DenialAnalysisDashboard />
    </main>
  );
};

export default Page;
