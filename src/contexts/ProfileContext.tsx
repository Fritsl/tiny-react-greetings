import { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  completedPages: Set<string>;
  isLoading: boolean;
  progress: number;
  matchQuality: number;
  setProgress: (progress: number) => void;
  setMatchQuality: (quality: number) => void;
  handleComplete: (pageId: string, onComplete?: () => void) => Promise<void>;
  refreshData: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [completedPages, setCompletedPages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [matchQuality, setMatchQuality] = useState(0);

  const handleComplete = async (pageId: string, onComplete?: () => void) => {
    setCompletedPages(prev => new Set([...prev, pageId]));
    onComplete?.();
  };

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <ProfileContext.Provider value={{
      completedPages,
      isLoading,
      progress,
      matchQuality,
      setProgress,
      setMatchQuality,
      handleComplete,
      refreshData
    }}>
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