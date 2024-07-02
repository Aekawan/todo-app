import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { FaBars } from 'react-icons/fa';

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onOpenSidebar
}) => {
  const router = useRouter();
  const { pathname } = router;

  const title = useMemo(() => {
    return pathname === '/todos' ? 'Todos' : 'Todos Table';
  }, [pathname]);

  return (
    <header className="bg-header-gradient p-4 fixed top-0 left-0 w-full z-10 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-center flex-grow text-black">{title}</h1>
      <div
        className="text-pink-400"
        onClick={onOpenSidebar}
      >
        <FaBars className="text-xl" />
      </div>
    </header>
  );
};

export default Header;