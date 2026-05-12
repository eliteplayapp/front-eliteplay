import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export function SectionContainer({ 
  children, 
  className = "", 
  id,
  fullWidth = false 
}: SectionContainerProps) {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 relative overflow-hidden ${className}`}
    >
      <div className={`${fullWidth ? 'w-full' : 'max-w-[1920px] mx-auto px-6 md:px-24'} relative z-10`}>
        {children}
      </div>
    </section>
  );
}
