import React, { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-custom-gradient">
      <Header />
      <main className="flex-grow mt-16 mb-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;