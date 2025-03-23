
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const ServiceCard = ({ id, name, icon, isActive = false }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/service/${id}`} className="text-decoration-none">
      <motion.div
        className={cn(
          "position-relative rounded-4 overflow-hidden shadow-sm cursor-pointer bg-white transition-all",
          isActive ? "border border-primary" : "hover-shadow"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="bg-primary p-3 text-center">
          <h3 className="text-white fw-medium fs-5 mb-0">{name}</h3>
        </div>
        <div 
          className={cn(
            "d-flex align-items-center justify-content-center p-4 transition-all",
            isHovered ? "bg-light" : "bg-secondary bg-opacity-25"
          )}
        >
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-primary"
            style={{ width: '4rem', height: '4rem' }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard;
