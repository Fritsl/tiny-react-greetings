import React from 'react';
import { FormPage, FormState, FormData } from '../../../types';
import { ProfileFormProgress } from '../ProfileFormProgress';
import { ProfileFormContent } from '../ProfileFormContent';

interface ProfileFormMainContentProps {
  currentPage: FormPage;
  formState: FormState;
  formData: FormData;
  setFormData: (data: FormData) => void;
  handlePageComplete: (pageId: string) => void;
  handleRefresh: () => void;
  isRefreshing: boolean;
  completedPages: Set<string>;
}

export function ProfileFormMainContent({
  currentPage,
  formState,
  formData,
  setFormData,
  handlePageComplete,
  handleRefresh,
  isRefreshing,
  completedPages
}: ProfileFormMainContentProps) {
  return (
    <div className="w-full max-w-3xl p-2 md:p-8 space-y-4 md:space-y-6 pt-2 md:pt-4">
      <ProfileFormProgress
        progress={formState.overallProgress}
        matchQuality={formState.predictedMatchQuality}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        completedPages={completedPages}
      />
      
      <div className="bg-card rounded-lg p-3 md:p-6 shadow-sm border border-border mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6 hidden md:block">
          {currentPage.title}
        </h2>
        <ProfileFormContent
          currentPageId={currentPage.id}
          formData={formData}
          setFormData={setFormData}
          handlePageComplete={handlePageComplete}
          isCompleted={currentPage.isCompleted}
        />
      </div>
    </div>
  );
}