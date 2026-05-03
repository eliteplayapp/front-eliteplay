"use client";

import * as Icons from "../../lib/libraries";
import { Sparkles } from "../../lib/libraries";

interface DynamicIconProps {
  iconName?: string;
  size?: number;
  className?: string;
  fallback?: React.ElementType;
}

/**
 * Component to resolve and render Lucide icons dynamically from a string name.
 */
export function DynamicIcon({ 
  iconName, 
  size = 20, 
  className, 
  fallback: Fallback = Sparkles 
}: DynamicIconProps) {
  if (!iconName) {
    return Fallback ? <Fallback size={size} className={className} /> : null;
  }

  // Format name: "rocket" -> "Rocket"
  const iconFormatted = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const Icon = (Icons as any)[iconFormatted] || Fallback;

  if (!Icon) return null;

  return <Icon size={size} className={className} />;
}
