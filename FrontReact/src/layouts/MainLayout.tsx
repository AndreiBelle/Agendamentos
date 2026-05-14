import React from 'react';
import { Navbar } from '../components/Navbar';
import './MainLayout.css';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';


// interface LayoutProps {
//   children: React.ReactNode;
// }

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="layout-wrapper">
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="layout-content">
        {children}
      </main>
    </div>
  );
};