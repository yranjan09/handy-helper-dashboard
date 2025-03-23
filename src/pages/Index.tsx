
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
import ServiceDetails from '@/components/ServiceDetails';
import ServiceHistory from '@/components/ServiceHistory';
import { services, appointments } from '@/data/services';
import { Service } from '@/types/service';

const Index = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Header username="Josh" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Our Services</h2>
          </div>
          
          <div className="horizontalScroll flex space-x-4 pb-4 overflow-x-auto">
            <AnimatePresence>
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  <ServiceCard
                    name={service.name}
                    icon={getServiceIcon(service.icon)}
                    onClick={() => handleServiceClick(service)}
                    isActive={selectedService?.id === service.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {selectedService && (
            <ServiceDetails service={selectedService} />
          )}
        </AnimatePresence>
        
        <ServiceHistory appointments={appointments} />
      </div>
    </div>
  );
};

export default Index;
