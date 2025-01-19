import { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  completedPages: Set<string>;
  isLoading: boolean;
  handleComplete: (pageId: string, onComplete?: () => void) => Promise<void>;
  refreshData: () => Promise<void>;
}

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [completedPages, setCompletedPages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (pageId: string, onComplete?: () => void) => {
    setCompletedPages(prev => new Set([...prev, pageId]));
    onComplete?.();
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <ProfileContext.Provider value={{
      completedPages,
      isLoading,
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