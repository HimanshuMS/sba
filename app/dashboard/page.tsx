"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ExpenseForm from '@/components/common/ExpenseForm';
import ExpenseList from '@/components/common/ExpenseList';
// import ExpenseChart from '@/components/common/ExpenseChart';

// const MyChart = dynamic(
//   () => import('../components/MyChart'),
//   { ssr: false }
// )

const ExpenseChart = dynamic(
  () => import('@/components/common/ExpenseChart'),
  { ssr: false }
)

interface Expense {
  amount: number;
  category: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <div className='flex items-center justify-center'>
      <ExpenseForm addExpense={addExpense} />
      {/* <ExpenseList expenses={expenses} /> */}
      <ExpenseChart expenses={expenses} />
    </div>
  );
}
