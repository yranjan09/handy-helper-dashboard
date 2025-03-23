
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlumbingIcon, 
  CleaningIcon, 
  CookingIcon, 
  RepairsIcon, 
  ElectricalIcon, 
  LaundryIcon 
} from '@/components/icons/ServiceIcons';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import ServiceHistory from '@/components/ServiceHistory';
import { services, appointments } from '@/data/services';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'plumbing': return <PlumbingIcon />;
      case 'cleaning': return <CleaningIcon />;
      case 'cooking': return <CookingIcon />;
      case 'repairs': return <RepairsIcon />;
      case 'electrical': return <ElectricalIcon />;
      case 'laundry': return <LaundryIcon />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="container px-4 py-4">
        <Header username="Josh" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4"
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="fs-4 fw-medium">Our Services</h2>
          </div>
          
          <div className="d-flex gap-4 pb-4 overflow-auto">
            <AnimatePresence>
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                  style={{ width: '170px', flexShrink: 0 }}
                >
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    icon={getServiceIcon(service.icon)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <ServiceHistory appointments={appointments} />
      </div>
    </div>
  );
};

export default Index;
