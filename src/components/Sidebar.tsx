import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

Modal.setAppElement('#__next');

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="fixed top-0 left-0 right-0 bottom-0 sm:top-[20%] sm:left-1/4 sm:right-1/4 sm:bottom-[20%] bg-white shadow-lg p-4 overflow-y-auto transition-transform transform translate-x-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        contentLabel="Task Details"
        style={{
          content: {
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          },
        }}
      >
        <div className="relative flex h-full justify-between flex-col">
          <button
            onClick={onClose}
            className="absolute z-10 top-2 right-2 w-8 h-8 text-pink-400 hover:text-pink-500"
          >
            <FaTimes className="w-8 h-8" />
          </button>
          <div className="p-4 relative">
            <div className="w-28 h-28 rounded-full bg-gray-400 mx-auto"></div>
            <h2 className="text-3xl font-semibold text-center mb-4 mt-4">{user?.username}</h2>
          </div>
          <button
            onClick={logout}
            className="bg-gradient-to-r mt-4 from-red-400 to-red-600 text-white p-4 rounded-full w-full"
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;