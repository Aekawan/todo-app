import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient p-4">
      <main className="flex-grow mt-16 mb-16">{children}</main>
    </div>
  );
};

export default LoginLayout;