import { useTopMenu } from '../../hooks/useTopMenu';
import { TopMenuBrand } from './TopMenu/TopMenuBrand';
import { TopMenuDesktopNav } from './TopMenu/TopMenuDesktopNav';
import { TopMenuMobileNav } from './TopMenu/TopMenuMobileNav';

export function TopMenu() {
  const {
    location,
    isDropdownOpen,
    isMobileMenuOpen,
    dropdownRef,
    handleNavigate,
    setIsDropdownOpen,
    setIsMobileMenuOpen
  } = useTopMenu();

  // Since we're removing authentication, we'll use a no-op function
  const handleSignOut = () => {};

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
      <div className="h-full flex items-center justify-between px-4">
        <TopMenuBrand />
        
        <TopMenuDesktopNav
          location={location}
          isDropdownOpen={isDropdownOpen}
          dropdownRef={dropdownRef}
          onNavigate={handleNavigate}
          setIsDropdownOpen={setIsDropdownOpen}
          onSignOut={handleSignOut}
        />

        <TopMenuMobileNav
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onSignOut={handleSignOut}
        />
      </div>
    </header>
  );
}