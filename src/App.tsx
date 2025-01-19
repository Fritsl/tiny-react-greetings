import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopMenu } from './components/layout/TopMenu';
import { Footer } from './components/layout/Footer';
import { JobSearch } from './pages/JobSearch';
import { CompanySearch } from './pages/CompanySearch';
import { ProfileForm } from './pages/ProfileForm';
import { Tools } from './pages/Tools';
import { HowItWorks } from './pages/HowItWorks';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { Profiles } from './pages/Profiles';
import { ProfileProvider } from './contexts/ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <TopMenu />
          <div className="flex-1 mt-16">
            <Routes>
              <Route path="/" element={<ProfileForm />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/companies" element={<CompanySearch />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<About />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="*" element={<ProfileForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;