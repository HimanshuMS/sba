interface ExpenseListProps {
    expenses: { amount: number; category: string }[];
  }
  
  const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
    return (
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.amount} - {expense.category}
          </li>
        ))}
      </ul>
    );
  };
  
  export default ExpenseList;
  