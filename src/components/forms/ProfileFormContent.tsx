
import { ProfileHeadlineForm } from './ProfileHeadlineForm';
import { EnvironmentForm } from './EnvironmentForm';
import { LocationForm } from './LocationForm';
import { ConsiderationsForm } from './ConsiderationsForm';
import { PersonalInterestsForm } from './PersonalInterestsForm';
import { LifeGoalsForm } from './LifeGoalsForm';
import { ResumeForm } from '../resume/ResumeForm';
import { FormData } from '../../types';

interface ProfileFormContentProps {
  currentPageId: string;
  formData: FormData;
  setFormData: (data: FormData) => void;
  handlePageComplete: (pageId: string) => void;
  isCompleted: boolean;
}

export function ProfileFormContent({
  currentPageId,
  formData,
  setFormData,
  handlePageComplete,
  isCompleted
}: ProfileFormContentProps) {
  const updateFormData = (pageId: string, data: any) => {
    setFormData({
      ...formData,
      [pageId]: data
    });
  };

  switch (currentPageId) {
    case 'profile-headline':
      return (
        <ProfileHeadlineForm
          value={formData['profile-headline']}
          onChange={(value) => updateFormData('profile-headline', value)}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'environment':
      return (
        <EnvironmentForm
          data={formData.environment}
          onChange={(data) => updateFormData('environment', data)}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'location':
      return (
        <LocationForm
          data={formData.location}
          onChange={(data) => updateFormData('location', data)}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'considerations':
      return (
        <ConsiderationsForm
          data={formData.considerations}
          onChange={(data) => updateFormData('considerations', data)}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'personal-interests':
      return (
        <PersonalInterestsForm
          data={formData['personal-interests']}
          onChange={(data) => updateFormData('personal-interests', data)}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'life-goals':
      return (
        <LifeGoalsForm
          data={formData['life-goals']}
          onChange={(data) => updateFormData('life-goals', data)}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    case 'resume':
      return (
        <ResumeForm
          data={formData.resume}
          onChange={(data) => updateFormData('resume', data)}
          onComplete={() => handlePageComplete(currentPageId)}
          isCompleted={isCompleted}
        />
      );

    default:
      return null;
  }
}