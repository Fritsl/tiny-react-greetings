import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const generateCoverLetter = () => {
    const letter = `
      Dear Hiring Manager,

      I am writing to express my interest in the ${jobTitle} position at ${companyName}. 
      With my skills and experience, I am confident that I would be a valuable addition to your team.

      Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.

      Sincerely,
      ${applicantName}
    `;
    setCoverLetter(letter);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Cover Letter Generator</h2>
      <div className="mb-4">
        <label className="block mb-1">Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Your Name</label>
        <input
          type="text"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        onClick={generateCoverLetter}
        className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        <RefreshCw className="mr-2" />
        Generate Cover Letter
      </button>
      {coverLetter && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold">Generated Cover Letter:</h3>
          <pre className="whitespace-pre-wrap">{coverLetter}</pre>
        </div>
      )}
    </div>
  );
}
