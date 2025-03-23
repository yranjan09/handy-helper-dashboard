
import { Service, Appointment } from '@/types/service';

export const services: Service[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'plumbing',
    items: [
      {
        id: 'faucet-repair',
        name: 'Faucet Repair',
        description: 'Regular Service',
        price: 100
      },
      {
        id: 'pressure-check',
        name: 'Pressure Check',
        description: 'Regular Service',
        price: 80
      },
      {
        id: 'pipe-fixtures',
        name: 'Pipe Fixtures',
        description: 'Regular Service',
        price: 300
      },
      {
        id: 'leak-repair',
        name: 'Leak Repair',
        description: 'Regular Service',
        price: 150
      }
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: 'cleaning',
    items: [
      {
        id: 'house-cleaning',
        name: 'House Cleaning',
        description: 'Standard Cleaning',
        price: 200
      },
      {
        id: 'deep-cleaning',
        name: 'Deep Cleaning',
        description: 'Thorough Cleaning',
        price: 350
      },
      {
        id: 'window-cleaning',
        name: 'Window Cleaning',
        description: 'All Windows',
        price: 150
      },
      {
        id: 'carpet-cleaning',
        name: 'Carpet Cleaning',
        description: 'Per Room',
        price: 100
      }
    ]
  },
  {
    id: 'cooking',
    name: 'Cooking',
    icon: 'cooking',
    items: [
      {
        id: 'daily-cooking',
        name: 'Daily Cooking',
        description: 'Regular Meals',
        price: 250
      },
      {
        id: 'party-cooking',
        name: 'Party Cooking',
        description: 'Special Occasions',
        price: 500
      },
      {
        id: 'meal-prep',
        name: 'Meal Prep',
        description: 'Weekly Preparation',
        price: 300
      }
    ]
  },
  {
    id: 'repairs',
    name: 'Repairs',
    icon: 'repairs',
    items: [
      {
        id: 'ac-repair',
        name: 'AC Repair',
        description: 'AC Service',
        price: 400
      },
      {
        id: 'fan-repair',
        name: 'Fan Repair',
        description: 'Fan Service',
        price: 150
      },
      {
        id: 'furniture-repair',
        name: 'Furniture Repair',
        description: 'Wood Furniture',
        price: 250
      }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'electrical',
    items: [
      {
        id: 'wiring',
        name: 'Wiring',
        description: 'New Wiring',
        price: 300
      },
      {
        id: 'installation',
        name: 'Installation',
        description: 'New Installation',
        price: 200
      },
      {
        id: 'circuit-repair',
        name: 'Circuit Repair',
        description: 'Electrical Circuit',
        price: 350
      }
    ]
  },
  {
    id: 'laundry',
    name: 'Laundry',
    icon: 'laundry',
    items: [
      {
        id: 'wash-fold',
        name: 'Wash & Fold',
        description: 'Per KG',
        price: 50
      },
      {
        id: 'dry-clean',
        name: 'Dry Clean',
        description: 'Per Item',
        price: 100
      },
      {
        id: 'ironing',
        name: 'Ironing',
        description: 'Per Item',
        price: 20
      }
    ]
  }
];

export const appointments: Appointment[] = [
  {
    id: '001',
    service: 'Plumbing',
    professional: 'John Smith',
    bookingDate: '03/10/2023',
    completionDate: '03/10/2023',
    phone: '555-123-4567',
    status: 'Completed'
  },
  {
    id: '002',
    service: 'Cleaning',
    professional: 'Maria Garcia',
    bookingDate: '03/15/2023',
    completionDate: '03/15/2023',
    phone: '555-987-6543',
    status: 'Completed'
  },
  {
    id: '003',
    service: 'Electrical',
    professional: 'David Johnson',
    bookingDate: '03/22/2023',
    phone: '555-456-7890',
    status: 'Scheduled'
  }
];
