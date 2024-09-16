import React from 'react';

const Index = () => {
  return (
    <div className="space-y-6 p-6 bg-blue-50">
      <h1 className="text-3xl font-bold text-blue-600">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Total Apps</h2>
          <p className="text-3xl font-bold text-blue-800">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Total Users</h2>
          <p className="text-3xl font-bold text-blue-800">156</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Total Teams</h2>
          <p className="text-3xl font-bold text-blue-800">8</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
