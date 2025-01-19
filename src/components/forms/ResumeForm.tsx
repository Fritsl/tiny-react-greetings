import React from 'react';
import { CompleteButton } from '../CompleteButton';
import { ResumeTimeline } from '../resume/ResumeTimeline';
import { TimelineChart } from '../resume/TimelineChart';
import { ResumeData, initialResumeData } from '../../types/resume';

interface ResumeFormProps {
  data: { resume: string };
  onChange: (data: { resume: string }) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function ResumeForm({ onComplete, isCompleted }: ResumeFormProps) {
  const [resumeData, setResumeData] = React.useState<ResumeData>(initialResumeData);

  return (
    <div className="space-y-8">
      {/* Visual Timeline Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 px-1">
          <h2 className="text-lg font-semibold text-gray-900">Career Timeline</h2>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <div className="min-w-[800px]">
            <TimelineChart entries={resumeData.entries} />
          </div>
        </div>
      </section>

      {/* Complete Button */}
      <div className="flex justify-end pt-4">
        <CompleteButton
          onComplete={onComplete}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}