
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { Service, ServiceItem } from '@/types/service';
import Header from '@/components/Header';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const foundService = services.find(s => s.id === serviceId);
      setService(foundService || null);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [serviceId]);

  const handleBookService = (item: ServiceItem) => {
    toast.success(`${item.name} service booked successfully!`, {
      description: `Your ${service?.name} service has been scheduled.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen">
        <div className="container py-4">
          <Header username="Josh" />
          <div className="text-center mt-5">
            <h2 className="mb-4">Service not found</h2>
            <Link to="/">
              <Button className="d-flex align-items-center gap-2">
                <ChevronLeft size={18} />
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <div className="container py-4">
        <Header username="Josh" />
        
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link to="/">
            <Button variant="outline" className="d-flex align-items-center gap-2">
              <ChevronLeft size={18} />
              Back
            </Button>
          </Link>
          <div className="badge bg-success-subtle text-success fs-5 px-4 py-2 rounded-pill">
            {service.name}
          </div>
          <div className="invisible">
            <Button variant="outline">Spacer</Button>
          </div>
        </div>
        
        <div className="row mt-4">
          {service.items.map((item, index) => (
            <motion.div
              key={item.id}
              className="col-md-6 col-lg-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-warning-subtle">
                  <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
                    {item.name}
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.provider || 'Service Provider'}</h5>
                  <p className="text-muted small">{item.description}</p>
                  
                  <div className="d-flex align-items-center mb-2">
                    <div className="me-2">
                      {item.rating ? (
                        Array(5).fill(0).map((_, i) => (
                          <i 
                            key={i} 
                            className={`bi ${i < Math.floor(item.rating || 0) ? 'bi-star-fill' : 'bi-star'} 
                            text-warning`}
                          ></i>
                        ))
                      ) : (
                        <span className="text-muted">Unrated</span>
                      )}
                    </div>
                    <small className="text-muted">
                      {item.rating || 'Unrated'} ({item.reviews || 0} reviews)
                    </small>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="fs-4 fw-bold">
                      ₹{item.price.toFixed(1)} <small className="text-muted fw-normal">/-</small>
                    </div>
                    
                    <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill">
                      {item.experience || '3-5 yrs xp'}
                    </span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-secondary btn-sm">
                      Save
                    </button>
                    <button 
                      className="btn btn-warning px-4 py-2"
                      onClick={() => handleBookService(item)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
