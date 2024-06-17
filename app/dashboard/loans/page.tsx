"use client"
import { useState } from 'react';
import LoanForm from '@/components/common/LoanForm';
import LoanList from '@/components/common/LoanList';
import Reminder from '@/components/common/Reminder';

interface Loan {
  amount: number;
  person: string;
  type: 'Lent' | 'Borrowed';
}

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);

  const addLoan = (loan: Loan) => {
    setLoans([...loans, loan]);
  };

  return (
    <div>
      <h1>Loans</h1>
      <LoanForm addLoan={addLoan} />
      <LoanList loans={loans} />
      <Reminder loans={loans} />
    </div>
  );
}
