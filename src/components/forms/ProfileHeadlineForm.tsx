import React, { useState } from 'react';
import { CompleteButton } from '../CompleteButton';
import { useProfile } from '../../contexts/ProfileContext';

interface ProfileHeadlineFormProps {
  value: string;
  onChange: (value: string) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function ProfileHeadlineForm({ value, onChange, onComplete, isCompleted }: ProfileHeadlineFormProps) {
  const { handleComplete } = useProfile();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    if (!value.trim()) return;
    
    setIsSaving(true);
    try {
      await handleComplete('profile-headline', onComplete);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Describe yourself in a headline
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Senior Software Engineer specializing in cloud architecture and distributed systems"
            className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <CompleteButton
          onComplete={handleSave}
          isCompleted={isCompleted}
          isDisabled={!value.trim() || isSaving}
        />
      </div>
    </div>
  );
}