import { IconType } from 'react-icons';
import { FaShoppingBasket, FaBasketballBall, FaTree, FaGift, FaDumbbell, FaMapMarkerAlt } from 'react-icons/fa';

const iconComponents: { [key: string]: { icon: IconType; color: string; bgColor: string } } = {
  'shopping': { icon: FaShoppingBasket, color: 'text-orange-400', bgColor: 'bg-orange-400'},
  'basket_ball': { icon: FaBasketballBall, color: 'text-pink-400', bgColor: 'bg-pink-400'},
  'tree': { icon: FaTree, color: 'text-blue-400', bgColor: 'bg-blue-400'},
  'gift': { icon: FaGift, color: 'text-cyan-400', bgColor: 'bg-cyan-400'},
  'dumbbell': { icon: FaDumbbell, color: 'text-purple-400', bgColor: 'bg-purple-400'},
  'map_marker': { icon: FaMapMarkerAlt, color: 'text-blue-400', bgColor: 'bg-blue-400'},
};


export default function TaskIcon({
  icon,
  size = 'text-2xl',
  iconType = 'icon',
  isClickable = false,
  isSelected = false,
  onClick = () => {},
}: {
  icon: string | number;
  size?: string;
  iconType?: string;
  isSelected?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}) {
  const IconComponent = iconComponents[icon];

  if (iconType === 'circle') {
    return (
      <div
        className={`rounded-full ${IconComponent.bgColor} ${size} ${isSelected ? 'border-black' : null} ${isClickable ? 'border-2' : null} p-2`}
        onClick={onClick}
      >
        <IconComponent.icon className="text-white" />
      </div>
    );
  }

  return (
    <IconComponent.icon className={`${size} ${IconComponent.color}`} />
  );
};