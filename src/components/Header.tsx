
import { motion } from 'framer-motion';
import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between w-full py-6"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-4xl font-medium">
          Welcome, <span className="font-bold">{username}</span>
        </h1>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center space-x-4"
      >
        <Button size="icon" variant="ghost" className="rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        
        <Button size="icon" variant="ghost" className="rounded-full">
          <User size={20} />
        </Button>
        
        <Button size="icon" variant="ghost" className="rounded-full md:hidden">
          <Menu size={20} />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Header;
