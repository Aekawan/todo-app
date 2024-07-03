import React, { ReactNode, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  return (
    <div className="max-h-screen h-screen overflow-scroll flex flex-col bg-custom-gradient">
      <Header onOpenSidebar={() => setIsOpenSidebar(true)} />
      <Sidebar
        isOpen={isOpenSidebar}
        onClose={() => {
          setIsOpenSidebar(false)
        }}
      />
      <main className="flex-grow mt-16 mb-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;