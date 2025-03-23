
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Service, ServiceItem } from '@/types/service';
import BookingModal from './BookingModal';

interface ServiceDetailsProps {
  service: Service | null;
}

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleBooking = (item: ServiceItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  if (!service) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="mt-8 bg-card rounded-2xl shadow-sm p-6 overflow-hidden"
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-2xl font-medium text-foreground mb-6"
        >
          {service.name} Services
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {service.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-background rounded-xl overflow-hidden border border-border"
            >
              <div className="p-5">
                <h3 className="font-medium text-foreground text-lg mb-1">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-1">{item.description}</p>
                <p className="text-foreground font-medium mb-4">₹{item.price}</p>
                <Button 
                  className="w-full transition-all"
                  onClick={() => handleBooking(item)}
                >
                  Book
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {selectedItem && (
          <BookingModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            item={selectedItem}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceDetails;
