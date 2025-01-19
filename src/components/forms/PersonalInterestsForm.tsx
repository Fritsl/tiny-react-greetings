import { useState } from 'react';
import { CompleteButton } from '../CompleteButton';
import { useProfile } from '../../contexts/ProfileContext';

export function PersonalInterestsForm() {
  const { handleComplete } = useProfile();
  const [interests, setInterests] = useState<string>('');
  const [hobbies, setHobbies] = useState<string>('');

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterests(e.target.value);
  };

  const handleHobbiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHobbies(e.target.value);
  };

  const handleCompleteClick = async () => {
    await handleComplete('personal-interests', () => {
      // Optionally reset the form or navigate
      setInterests('');
      setHobbies('');
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Interests</label>
        <input
          type="text"
          value={interests}
          onChange={handleInterestsChange}
          placeholder="Your interests"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hobbies</label>
        <input
          type="text"
          value={hobbies}
          onChange={handleHobbiesChange}
          placeholder="Your hobbies"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <CompleteButton onComplete={handleCompleteClick} />
    </div>
  );
}
