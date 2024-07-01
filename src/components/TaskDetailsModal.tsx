import React, { useState } from 'react';
import Modal from 'react-modal';
import TaskIcon from './TaskIcon';
import { formatDate } from '../utils/date';

Modal.setAppElement('#__next');

interface TaskDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: any;
  onEdit: (task: any) => void;
  onDelete: (taskId: string) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isOpen, onRequestClose, task, onEdit, onDelete }) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDelete = () => {
    onDelete && onDelete(task.id);
    onRequestClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="fixed top-0 left-0 right-0 bottom-0 sm:top-[20%] sm:left-1/4 sm:right-1/4 sm:bottom-[20%] bg-white shadow-lg p-4 overflow-y-auto transition-transform transform translate-x-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        contentLabel="Task Details"
        style={{
          content: {
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          },
        }}
      >
        {task && (
          <div className="h-full">
            <div className="flex justify-center mb-4">
              <TaskIcon
                size="text-4xl"
                iconType='circle'
                icon={task.icon}
              />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">{task.name}</h2>
            <div className="text-center mb-4">
              <span className="font-semibold">{formatDate(task.date)}</span>
              <span className="ml-2 text-gray-500">{task.time}</span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Title</h3>
              <p className="mt-1 text-gray-700">{task.title}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="mt-1 text-gray-700">{task.description}</p>
            </div>

            <div className="w-full p-4 absolute bottom-0 left-0">
            <div className="flex w-full justify-between mt-4">
              <button
                onClick={() => onEdit(task)}
                className="bg-yellow-400 text-white p-2 rounded-full w-1/3"
              >
                Edit
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="bg-red-400 text-white p-2 rounded-full w-1/3"
              >
                Delete
              </button>
            </div>
            <button
              onClick={onRequestClose}
              className="bg-gradient-to-r mt-4 from-blue-400 to-blue-600 text-white p-4 rounded-full w-full"
            >
              Done
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onRequestClose={() => setIsDeleteConfirmOpen(false)}
        className="fixed top-1/3 left-[10%] right-[10%] bottom-1/3 bg-white shadow-lg p-4 overflow-y-auto w-[80%]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        contentLabel="Confirm Delete"
      >
        <h2 className="text-xl font-semibold text-center mb-4">Confirm Delete</h2>
        <p className="text-center mb-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-around">
          <button
            onClick={() => {
              handleDelete();
              setIsDeleteConfirmOpen(false);
            }}
            className="bg-red-400 text-white p-2 rounded-full w-1/3"
          >
            Yes
          </button>
          <button
            onClick={() => setIsDeleteConfirmOpen(false)}
            className="bg-gray-400 text-white p-2 rounded-full w-1/3"
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TaskDetailsModal;