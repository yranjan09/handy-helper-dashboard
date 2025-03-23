
import React from 'react';

interface IconProps {
  className?: string;
}

export const PlumbingIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M30,30 C30,20 40,20 40,30 L40,50 L60,50 L60,70 C60,80 50,80 50,70 L50,60 L30,60 Z" fill="currentColor" strokeWidth="2" />
    <circle cx="30" cy="40" r="10" fill="currentColor" />
    <circle cx="60" cy="60" r="10" fill="currentColor" />
  </svg>
);

export const CleaningIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="45" y="10" width="10" height="60" fill="currentColor"/>
    <path d="M40,70 L60,70 L55,90 L45,90 Z" fill="currentColor"/>
    <path d="M70,40 C80,30 75,20 70,30 L60,40 M55,35 L65,45 M50,40 L60,50" stroke="currentColor" fill="none" strokeWidth="4"/>
  </svg>
);

export const CookingIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M30,60 C30,40 70,40 70,60 L70,70 L30,70 Z" fill="currentColor"/>
    <line x1="30" y1="70" x2="70" y2="70" stroke="currentColor" strokeWidth="4"/>
    <path d="M40,30 C40,20 45,20 45,30 M50,25 C50,15 55,15 55,25 M60,30 C60,20 65,20 65,30" stroke="currentColor" fill="none" strokeWidth="3"/>
  </svg>
);

export const RepairsIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M30,30 L50,50 M40,60 L30,70" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    <path d="M60,30 L70,20 L80,30 L70,40 Z" fill="currentColor"/>
  </svg>
);

export const ElectricalIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3"/>
    <path d="M50,30 L50,50 M50,55 L50,55" stroke="currentColor" strokeWidth="4"/>
    <path d="M40,20 L60,20 L50,40 Z" fill="currentColor"/>
  </svg>
);

export const LaundryIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="30" width="50" height="50" rx="5" fill="none" stroke="currentColor" strokeWidth="3"/>
    <circle cx="50" cy="55" r="15" fill="none" stroke="currentColor" strokeWidth="3"/>
    <rect x="30" y="20" width="40" height="10" fill="currentColor"/>
  </svg>
);
