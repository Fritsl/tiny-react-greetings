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

  // Simplified handleComplete without database calls
  const handleComplete = async (pageId: string, onComplete?: () => void) => {
    const newCompletedPages = new Set(completedPages);
    newCompletedPages.add(pageId);
    setCompletedPages(newCompletedPages);
    
    // Calculate new progress
    setProgress((newCompletedPages.size / 7) * 100);
    
    // Update match quality (simplified calculation)
    setMatchQuality(Math.min(100, newCompletedPages.size * 15));
    
    onComplete?.();
  };

  // Simplified refresh without database calls
  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
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