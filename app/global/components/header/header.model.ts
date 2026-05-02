export interface NavLink {
  label: string;
  href: string;
}

export interface LangOption {
  label: string;
  href: string;
  ariaLabel: string;
  isActive: boolean;
}

export interface HeaderProps {
  logoUrl?: string | null;
  logoAlt?: string;
  navLinks?: NavLink[];
  langOptions?: LangOption[];
}
