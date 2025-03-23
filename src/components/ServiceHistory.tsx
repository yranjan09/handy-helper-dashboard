
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types/service';
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, Dialog, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ServiceHistoryProps {
  appointments: Appointment[];
}

interface ServiceRemarksForm {
  remarks: string;
  rating: number;
}

const ServiceHistory = ({ appointments }: ServiceHistoryProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [open, setOpen] = useState(false);
  const [remarksOpen, setRemarksOpen] = useState(false);

  const form = useForm<ServiceRemarksForm>({
    defaultValues: {
      remarks: "",
      rating: 0
    }
  });

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleViewRemarks = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRemarksOpen(true);
    form.reset({
      remarks: "",
      rating: appointment.status === 'Completed' ? 3 : 0
    });
  };

  const onSubmitRemarks = (data: ServiceRemarksForm) => {
    toast.success("Service remarks submitted successfully!");
    setRemarksOpen(false);
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

  const renderRatingStars = (currentRating: number, maxRating: number = 5) => {
    return Array.from({ length: maxRating }).map((_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer ${i < form.watch('rating') ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
        onClick={() => form.setValue('rating', i + 1)}
      />
    ));
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
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(appointment)}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewRemarks(appointment)}
                      >
                        Remarks
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>

      {/* Basic Appointment Details Dialog */}
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

      {/* Service Remarks Dialog */}
      <Dialog open={remarksOpen} onOpenChange={setRemarksOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-blue-600">Service Remarks</DialogTitle>
            <DialogDescription className="text-center">
              Request ID: {selectedAppointment?.id}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitRemarks)} className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border border-pink-200 bg-pink-50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-center text-gray-800">{selectedAppointment?.service}</p>
                  </CardContent>
                </Card>
                <Card className="border border-pink-200 bg-pink-50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-center text-gray-800">{selectedAppointment?.service} Service</p>
                  </CardContent>
                </Card>
                <Card className="border border-pink-200 bg-pink-50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-center text-gray-800">{selectedAppointment?.bookingDate}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="border border-pink-200 bg-pink-50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-center text-gray-800">Professional ID</p>
                  </CardContent>
                </Card>
                <Card className="border border-pink-200 bg-pink-50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-center text-gray-800">{selectedAppointment?.professional}</p>
                  </CardContent>
                </Card>
                <Card className="border border-pink-200 bg-pink-50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-center text-gray-800">{selectedAppointment?.phone}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <label className="font-medium text-gray-700">Service rating:</label>
                <div className="flex space-x-1">
                  {renderRatingStars(form.watch('rating'))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Remarks (if any):</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your remarks about the service..." 
                        className="border-2 border-gray-300 resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-center space-x-6">
                <Button type="submit" className="px-10 bg-blue-500 hover:bg-blue-600">
                  Submit
                </Button>
                <Button type="button" onClick={() => setRemarksOpen(false)} className="px-10 bg-blue-500 hover:bg-blue-600">
                  Close
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServiceHistory;
