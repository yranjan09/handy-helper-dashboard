
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const ServiceCard = ({ name, icon, onClick, isActive = false }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative w-[170px] rounded-2xl overflow-hidden cursor-pointer bg-card shadow-sm transition-all duration-300",
        isActive ? "ring-2 ring-primary" : "hover:shadow-md"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-full bg-primary p-3 text-center">
        <h3 className="text-primary-foreground font-medium text-lg">{name}</h3>
      </div>
      <div 
        className={cn(
          "flex items-center justify-center p-6 transition-all duration-300",
          isHovered ? "bg-accent" : "bg-secondary/50"
        )}
      >
        <motion.div 
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-primary w-16 h-16"
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
