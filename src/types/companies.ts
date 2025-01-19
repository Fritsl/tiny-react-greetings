export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  careerPage: string;
  founded: number;
  highlights: string[];
  culture: string[];
  benefits: string[];
  matchScore: number;
  onViewDetails: (id: string) => void;
}

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp',
    description: 'Leading technology solutions provider',
    industry: 'Technology',
    size: '1000-5000',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    careerPage: 'https://techcorp.com/careers',
    founded: 2010,
    highlights: ['Remote-first', 'Competitive salary'],
    culture: ['Innovation', 'Collaboration'],
    benefits: ['Health insurance', '401k'],
    matchScore: 85,
    onViewDetails: (id) => console.log('View details:', id)
  }
];