import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useTopMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return {
    location,
    isDropdownOpen,
    isMobileMenuOpen,
    dropdownRef,
    handleNavigate,
    setIsDropdownOpen,
    setIsMobileMenuOpen
  };
}