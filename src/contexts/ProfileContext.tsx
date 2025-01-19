import React, { createContext, useContext, useState } from 'react';

interface ProfileContextType {
  progress: number;
  matchQuality: number;
  completedPages: Set<string>;
  handleComplete: (pageId: string, onComplete?: () => void) => Promise<void>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [matchQuality, setMatchQuality] = useState(0);
  const [completedPages, setCompletedPages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (pageId: string, onComplete?: () => void) => {
    setCompletedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(pageId);
      return newSet;
    });
    onComplete?.();
  };

  const refreshData = async () => {
    // Mock refresh function
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        progress,
        matchQuality,
        completedPages,
        handleComplete,
        refreshData,
        isLoading
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}