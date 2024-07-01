import React from 'react';

const CalendarMode: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">July 2017</h2>
      <ul>
        {['22 Shopping list', '22 Play basketball'].map((event, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{event}</span>
            <span>20 min</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarMode;