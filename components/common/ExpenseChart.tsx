import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Expense {
  amount: number;
  category: string;
}

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const data = expenses?.reduce((acc, expense) => {
    const existingCategory = acc.find((item) => item.category === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as { category: string; amount: number }[]);

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip contentStyle={{backgroundColor: 'black'}} />
      <Legend />
      <Bar dataKey="amount" fill="#ffffff"  />
    </BarChart>
  );
};

export default ExpenseChart;
