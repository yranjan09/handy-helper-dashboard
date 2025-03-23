
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types/service';
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, Dialog, DialogDescription } from '@/components/ui/dialog';

interface ServiceHistoryProps {
  appointments: Appointment[];
}

const ServiceHistory = ({ appointments }: ServiceHistoryProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [open, setOpen] = useState(false);

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-medium mb-6 text-foreground">Service History</h2>
      
      <div className="rounded-xl overflow-hidden shadow-sm bg-card">
        <div className="overflow-x-auto">
          <motion.table 
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="py-4 px-6 text-left font-normal">ID</th>
                <th className="py-4 px-6 text-left font-normal">Service</th>
                <th className="py-4 px-6 text-left font-normal">Professional</th>
                <th className="py-4 px-6 text-left font-normal">Booking</th>
                <th className="py-4 px-6 text-left font-normal">Completion</th>
                <th className="py-4 px-6 text-left font-normal">Phone</th>
                <th className="py-4 px-6 text-left font-normal">Status</th>
                <th className="py-4 px-6 text-left font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <motion.tr 
                  key={appointment.id}
                  variants={item}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">{appointment.id}</td>
                  <td className="py-4 px-6">{appointment.service}</td>
                  <td className="py-4 px-6">{appointment.professional}</td>
                  <td className="py-4 px-6">{appointment.bookingDate}</td>
                  <td className="py-4 px-6">{appointment.completionDate || "Pending"}</td>
                  <td className="py-4 px-6">{appointment.phone}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                      ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(appointment)}
                    >
                      View
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {selectedAppointment?.service} service on {selectedAppointment?.bookingDate}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4 py-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-medium">{selectedAppointment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Professional:</span>
                <span className="font-medium">{selectedAppointment.professional}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium
                  ${selectedAppointment.status === 'Completed' ? 'text-green-600' : 
                    selectedAppointment.status === 'Scheduled' ? 'text-blue-600' : 
                    'text-yellow-600'}`}>
                  {selectedAppointment.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{selectedAppointment.phone}</span>
              </div>
              {selectedAppointment.status === 'Scheduled' && (
                <Button className="w-full mt-4">Reschedule</Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServiceHistory;
