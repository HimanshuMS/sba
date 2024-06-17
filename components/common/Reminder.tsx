import { useEffect } from 'react';

interface ReminderProps {
  loans: { amount: number; person: string; type: 'Lent' | 'Borrowed' }[];
}

const Reminder: React.FC<ReminderProps> = ({ loans }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      loans.forEach(loan => {
        alert(`Reminder: You have ${loan.type.toLowerCase()} money to/from ${loan.person}`);
      });
    }, 86400000); // Remind every 24 hours

    return () => clearInterval(interval);
  }, [loans]);

  return null;
};

export default Reminder;
