import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaShoppingBasket, FaBasketballBall, FaTree, FaGift, FaDumbbell, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTask } from '@/hooks/useTask';
import { dateToInputDate } from '../utils/date';
import { Task } from '@/types/task';
import TaskIcon from './TaskIcon';

Modal.setAppElement('#__next');

const icons = [
  { id: 'shopping', icon: FaShoppingBasket, color: 'bg-orange-400' },
  { id: 'basket_ball', icon: FaBasketballBall, color: 'bg-pink-400' },
  { id: 'tree', icon: FaTree, color: 'bg-blue-400' },
  { id: 'gift', icon: FaGift, color: 'bg-cyan-400' },
  { id: 'dumbbell', icon: FaDumbbell, color: 'bg-purple-400' },
  { id: 'map_marker', icon: FaMapMarkerAlt, color: 'bg-blue-400' },
];

interface TaskModalProps {
  isOpen: boolean;
  onFail: () => void;
  onSuccess: () => void;
  task?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onFail, onSuccess, task }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, clearErrors } = useForm<Task>();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const { addTask, editTask } = useTask();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setSelectedIcon(task.icon);
      reset({
        icon: task.icon,
        title: task.title,
        description: task.description,
        date: dateToInputDate(task.date),
        time: task.time,
      });
    } else {
      setSelectedIcon(null);
      reset();
    }
  }, [isOpen, task, reset]);

  useEffect(() => {
    if (selectedIcon) {
      setValue('icon', selectedIcon);
      clearErrors('icon');
    }
  }, [selectedIcon, setValue, clearErrors]);

  const onSubmit: SubmitHandler<Task> = async (data) => {
    setIsSubmitting(true);
    try {
      if (task) {
        await editTask({ _id: task.id, ...data });
        toast.success("Task updated successfully.");
      } else {
        await addTask({ ...data });
        toast.success("Task created successfully.");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to create task, please try again.");
      onFail();
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  const buttonText = task ? 'Save' : 'Add';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onSuccess}
      className="fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white shadow-lg p-4 overflow-y-auto transition-transform transform translate-x-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      contentLabel="Add New Task"
      style={{
        content: {
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        },
      }}
    >
      <h2 className="text-2xl font-semibold mb-4">{task ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Icon</label>
          <div className="flex space-x-4 mt-1">
            {icons.map((icon) => (
              <TaskIcon
                key={icon.id}
                icon={icon.id}
                size="text-xl"
                iconType="circle"
                isClickable
                isSelected={selectedIcon === icon.id}
                onClick={() => setSelectedIcon(icon.id)}
              />
            ))}
          </div>
          <input type="hidden" value={selectedIcon || ''} {...register('icon', { required: 'Icon is required' })} />
          {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon.message as string}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input type="text" className="mt-1 p-2 w-full border rounded" placeholder="Task Title" {...register('title', { required: 'Title is required' })} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="mt-1 p-2 w-full border rounded"
            placeholder="Task Description"
            rows={4}
            {...register('description')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 p-2 w-full border rounded"
            {...register('date', {
              required: 'Date is required',
              valueAsDate: true,
            })}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message as string}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            className="mt-1 p-2 w-full border rounded"
            {...register('time', { required: 'Time is required' })}
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message as string}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r mt-4 from-blue-400 to-blue-600 text-white p-4 rounded-full w-full"
        >
          {isSubmitting ? 'Loading...' : buttonText}
        </button>
      </form>
    </Modal>
  );
};

export default TaskModal;