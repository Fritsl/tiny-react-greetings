import React, { useState } from 'react';

interface DateSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: string;
  isEndDate?: boolean;
  onPresentToggle?: (checked: boolean) => void;
  isPresent?: boolean;
}

export function DateSelector({
  label,
  value,
  onChange,
  max,
  isEndDate,
  onPresentToggle,
  isPresent,
}: DateSelectorProps) {
  const [isPresentChecked, setIsPresentChecked] = useState(isPresent || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handlePresentToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsPresentChecked(checked);
    if (onPresentToggle) {
      onPresentToggle(checked);
    }
    if (checked) {
      onChange('Present');
    } else {
      onChange('');
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={isPresentChecked ? '' : value}
          onChange={handleChange}
          max={max}
          className="border border-gray-300 rounded-md p-2"
          disabled={isPresentChecked}
        />
        {isEndDate && (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isPresentChecked}
              onChange={handlePresentToggle}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Present</span>
          </div>
        )}
      </div>
    </div>
  );
}
