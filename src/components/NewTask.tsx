import React from 'react';

const NewTask: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">New Task</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Task</label>
          <input type="text" className="mt-1 p-2 w-full border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea className="mt-1 p-2 w-full border rounded"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input type="date" className="mt-1 p-2 w-full border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input type="time" className="mt-1 p-2 w-full border rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
      </form>
    </div>
  );
};

export default NewTask;