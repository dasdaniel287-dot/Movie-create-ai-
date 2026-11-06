/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AdvancedSearchPage } from './components/AdvancedSearchPage';
import { DownloadsPage } from './components/DownloadsPage';
import { UserProfilePage } from './components/UserProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { DownloadManagerModal } from './components/DownloadManagerModal';
import { AiSearchAssistantModal } from './components/AiSearchAssistantModal';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

const MainAppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex flex-col min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'browse' && <AdvancedSearchPage />}
        {activeTab === 'downloads' && <DownloadsPage />}
        {activeTab === 'profile' && <UserProfilePage />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Modals and Overlays */}
      <MovieDetailsModal />
      <VideoPlayerModal />
      <DownloadManagerModal />
      <AiSearchAssistantModal />
      <LegalNoticeModal />

      {/* Footer & Floating Alerts */}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
