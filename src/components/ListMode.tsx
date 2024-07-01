import React from 'react';
import TaskIcon from './TaskIcon';
import { formatDate } from '../utils/date';

const ListMode = ({ onOpenDetail, tasks = [] }: {
  onOpenDetail: (task: any) => void;
  tasks: any[];
}) => {
  return (
    <ul className="flex flex-col gap-4 pb-40">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="flex justify-between items-center mb-2 p-4 bg-white rounded-lg shadow-sm"
          onClick={() => onOpenDetail(task)}
        >
          <div className="flex items-center w-4/5">
            <TaskIcon iconType="circle" size="text-lg" icon={task.icon} />
            <span className="ml-3 text-wrap line-clamp-1">{task.title}</span>
          </div>
          <div className="text-right w-1/5">
            <div className="font-bold text-sm">{formatDate(task.date)}</div>
            <div className="text-xs">{task.time}</div>
          </div>
        </li>
      ))}
      </ul>
  );
};

export default ListMode;