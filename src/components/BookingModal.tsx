
import { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ServiceItem } from '@/types/service';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ServiceItem;
}

const BookingModal = ({ isOpen, onClose, item }: BookingModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("19:00");
  const [phone, setPhone] = useState("");

  const handleConfirm = () => {
    if (!date || !time || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`${item.name} service booked successfully!`, {
      description: `Your appointment has been scheduled for ${format(date, "dd-MM-yyyy")} at ${time}.`,
    });

    // Reset form
    setTime("19:00");
    setPhone("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Book Service</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-orange-50 rounded-xl p-4">
            <div className="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm inline-block mb-2">
              {item.name}
            </div>
            <h3 className="text-xl font-semibold flex items-center gap-1">
              {item.provider || 'Service Provider'}
              <span className="text-gray-400 text-xs">✏️</span>
            </h3>
            <p className="text-gray-500 text-sm">Regular Service</p>
            
            <div className="flex items-center gap-1 my-2">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-500 text-sm">
                {item.rating ? `${item.rating} (${item.reviews} reviews)` : 'Unrated (0 reviews)'}
              </span>
            </div>
            
            <div className="text-2xl font-bold mt-2">
              ₹{item.price.toFixed(1)} <span className="text-gray-400 text-sm font-normal">/-</span>
            </div>
            
            <div className="flex gap-2 mt-4">
              <div className="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm">
                {item.experience || '1-3 yrs xp'}
              </div>
              <button className="bg-orange-50 border border-orange-200 text-orange-800 py-1 px-3 rounded-full text-sm">
                Save
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Time</label>
              <div className="relative">
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10"
                />
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleConfirm}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            >
              Confirm
            </Button>

            <button 
              className="w-full text-center text-orange-500 font-medium text-sm py-2"
              onClick={onClose}
            >
              Reviews
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
