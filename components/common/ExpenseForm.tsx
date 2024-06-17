'use client'
import { useState } from 'react';

import { Button } from "@/components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
interface ExpenseFormProps {
    addExpense: (expense: { amount: number; category: string; description: string }) => void;
}

const categories = ["Food", "Transport", "Entertainment", "Medicines", "Health", "Other"];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (amount === 0 || category === '' || description === '') {
            alert("Please fill in all fields");
            return;
        }

        if (!categories.includes(category)) {
            setCategory('Other');
        }
        const expenseCategory = categories.includes(category) ? category : 'Other';
        addExpense({ amount: Number(amount), category: expenseCategory, description });

        console.log(category, amount, description);

        setIsOpen(false);

        setAmount(0);
        setCategory('');
        setDescription('');

        console.log(category, amount, description);

    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='default'>Add Expense</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Budget</DialogTitle>
                        <DialogDescription>Enter your budget here</DialogDescription>
                    </DialogHeader>
                    <div className="grid w-full items-center gap-4 py-12">
                        <div className="flex flex-col space-y-4">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type='number' onChange={(e) => setAmount(Number(e.target.value))} required />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" type='text' onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={(e) => setCategory(e)} required>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select" defaultValue="Food" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="Food">Food</SelectItem>
                                    <SelectItem value="Transport">Transport</SelectItem>
                                    <SelectItem value="Medicines">Medicines</SelectItem>
                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                    <SelectItem value="Health">Health Care</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit'>Add Expense</Button>

                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );

    //   return (
    //     <form onSubmit={handleSubmit}>
    //       <input
    //         type="number"
    //         value={amount}
    //         onChange={(e) => setAmount(Number(e.target.value))}
    //         placeholder="Amount"
    //         required
    //       />
    //       <input
    //         type="text"
    //         value={category}
    //         onChange={(e) => setCategory(e.target.value)}
    //         placeholder="Category"
    //         required
    //       />
    //       <button type="submit">Add Expense</button>
    //     </form>
    //   );
};

export default ExpenseForm;
