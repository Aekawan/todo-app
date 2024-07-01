import React, { use, useMemo, useState } from 'react';
import { FaCalendarAlt, FaCheck, FaList, FaPlus } from 'react-icons/fa';
import TaskModal from './TaskModal';
import { useTask } from '@/hooks/useTask';
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router

  const {
    fetchTasks,
  } = useTask()

  const handleNavigate = () => {
    if (pathname === '/todos-table') {
      router.push('/todos')
    } else {
      router.push('/todos-table')
    }
  }

  const isTodoPage = useMemo(() => {
    return pathname === '/todos'
  }, [pathname]);

  return (
    <footer className="bg-footer-gradient flex items-end p-8 h-56 fixed bottom-0 left-0 w-full z-10">
      <div className="flex w-full justify-around">
        <div>
          <div className="bg-purple-pink-gradient p-4 rounded-full shadow-lg">
            <FaCheck className="text-white text-xl" />
          </div>
        </div>
        <div>
          <div
            className="bg-white p-6 rounded-full shadow-lg"
            onClick={handleNavigate}
          >
            {isTodoPage ? (
            <FaCalendarAlt className="text-pink-500 text-2xl" />
            ) : (
            <FaList className="text-pink-500 text-2xl" />
            )}
            
          </div>
        </div>
        <div>
          <div
            className="bg-blue-gradient p-4 rounded-full shadow-lg cursor-pointer"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <FaPlus className="text-white text-xl" />
          </div>
        </div>
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        onFail={() => setIsTaskModalOpen(false)}
        onSuccess={() => {
          fetchTasks()
          setIsTaskModalOpen(false)
        }}
        task={null}
      />
    </footer>
  );
};

export default Footer;