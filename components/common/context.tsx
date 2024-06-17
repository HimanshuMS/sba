import React, { createContext, useState, useContext } from 'react';

interface Budget { // Define Budget interface here
  limit: number;
  expenses: { category: string; cost: number }[];
  loans: { name: string; amount: number; date: Date }[];
}

const BudgetContext = createContext<Budget>({ // Use Budget interface for context type
  limit: 0,
  expenses: [],
  loans: [],
});

const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budget, setBudget] = useState<Budget>({
    limit: 0,
    expenses: [],
    loans: [],
  });

  // Add functions to update budget, expenses, and loans (implement later)

  return (
    <BudgetContext.Provider value={{ ...budget }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);

export default BudgetProvider;
