interface LoanListProps {
    loans: { amount: number; person: string; type: 'Lent' | 'Borrowed' }[];
  }
  
  const LoanList: React.FC<LoanListProps> = ({ loans }) => {
    return (
      <ul>
        {loans.map((loan, index) => (
          <li key={index}>
            {loan.amount} - {loan.person} ({loan.type})
          </li>
        ))}
      </ul>
    );
  };
  
  export default LoanList;
  