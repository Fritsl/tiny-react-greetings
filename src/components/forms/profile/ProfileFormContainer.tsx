import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../contexts/ProfileContext';
import { useProfileFormState } from '../../../hooks/useProfileFormState';
import { ProfileFormHeader } from '../ProfileFormHeader';
import { ProfileFormLayout } from '../ProfileFormLayout';
import { ProfileFormLoading } from '../ProfileFormLoading';
import { ProfileFormContent } from '../ProfileFormContent';
import { ProfileFormProgress } from '../ProfileFormProgress';

export function ProfileFormContainer() {
  const navigate = useNavigate();
  const { setProgress, setMatchQuality, completedPages, isLoading, refreshData } = useProfile();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const {
    formData,
    setFormData,
    formState,
    handlePageSelect,
    handlePageComplete
  } = useProfileFormState(completedPages, setProgress, setMatchQuality);

  const handleSearchClick = () => {
    if (formState.predictedMatchQuality >= 60) {
      navigate('/jobs');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return <ProfileFormLoading />;
  }

  const currentPage = formState.pages.find(p => p.id === formState.currentPageId);
  if (!currentPage) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProfileFormHeader
        title={currentPage.title}
        onToggleNav={() => setIsNavOpen(!isNavOpen)}
        onRefresh={handleRefresh}
        onSearch={handleSearchClick}
        isRefreshing={isRefreshing}
        isSearchDisabled={formState.predictedMatchQuality < 60}
        completedPages={completedPages}
        matchQuality={formState.predictedMatchQuality}
      />

      <ProfileFormLayout
        isNavOpen={isNavOpen}
        pages={formState.pages}
        currentPageId={formState.currentPageId}
        onPageSelect={handlePageSelect}
        matchQuality={formState.predictedMatchQuality}
        remainingPages={formState.pages.filter(page => !page.isCompleted).length}
      >
        <ProfileFormMainContent
          currentPage={currentPage}
          formState={formState}
          formData={formData}
          setFormData={setFormData}
          handlePageComplete={handlePageComplete}
          handleRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          completedPages={completedPages}
        />
      </ProfileFormLayout>
    </div>
  );
}