"use client"
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LoanFormProps {
  addLoan: (loan: { amount: number; person: string; type: 'Lent' | 'Borrowed' }) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ addLoan }) => {
  const [amount, setAmount] = useState<number>(0);
  const [person, setPerson] = useState<string>('');
  const [type, setType] = useState<'Lent' | 'Borrowed'>('Lent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLoan({ amount, person, type });
    setAmount(0);
    setPerson('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Limit</CardTitle>
        <CardDescription>Enter your budget limit here</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type='number' onChange={(e) => setAmount(Number(e.target.value))} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="person">Person</Label>
              <Input id="person" type='text' onChange={(e) => setPerson(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Loan Type</Label>
              <Select onValueChange={(e) => setType(e.valueOf() as 'Lent' | 'Borrowed')}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Lent">Lent</SelectItem>
                  <SelectItem value="Borrowed">Borrowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type='submit' onClick={handleSubmit}>Add Expense</Button>
      </CardFooter>
    </Card>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="number"
    //     value={amount}
    //     onChange={(e) => setAmount(Number(e.target.value))}
    //     placeholder="Amount"
    //     required
    //   />
    //   <input
    //     type="text"
    //     value={person}
    //     onChange={(e) => setPerson(e.target.value)}
    //     placeholder="Person"
    //     required
    //   />
    //   <select value={type} onChange={(e) => setType(e.target.value as 'Lent' | 'Borrowed')}>
    //     <option value="Lent">Lent</option>
    //     <option value="Borrowed">Borrowed</option>
    //   </select>
    //   <button type="submit">Add Loan</button>
    // </form>
  );
};

export default LoanForm;
