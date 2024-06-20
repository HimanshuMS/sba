'use client'
import { useState, useEffect, useRef } from 'react';

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
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
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';

interface ExpenseFormProps {
    addExpense: (expense: { amount: number; category: string; description: string }) => void;
}

const categories = ["Food", "Transport", "Entertainment", "Medicines", "Health", "Other"];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date>()
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<[]>();

    const BudgetData = () => {
        fetch("/api/post/budget-data")
            .then((res) => res.json())
            .then((data) => setData(data.result.rows))
        setLoading(false)
    }

    useEffect(() => {
        BudgetData()
        setLoading(false)
    }, [])


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

        console.log(category, amount, description, date?.toString().split(" ", 4));

        const day = parseInt(date?.toString().split(" ", 4)[2]!)
        const month = date?.toString().split(" ", 4)[1]!
        const year = parseInt(date?.toString().split(" ", 4)[3]!)

        setIsOpen(false);

        setAmount(0);
        setCategory('');
        setDescription('');

        const payload = { amount, category, description, day, month, year }

        fetch("/api/post/budget-data", {
            method: "POST",
            body: JSON.stringify(payload)
        }).then((res) => res.json())
            .then((responseData) => console.log(responseData))
            .catch((err) => console.error(err.message))

        console.log(category, amount, description);

    };

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className='flex flex-row'>
            {<>{console.log("data", data!)}</>}
            <div>
                <div><Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant='default'>Add Expense</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Budget</DialogTitle>
                                <DialogDescription>Enter your budget here</DialogDescription>
                            </DialogHeader>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type='submit' onClick={BudgetData}>Submit</Button>

                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog></div>
                <div>
                    <ExpenseList data={data!} />
                </div>
            </div>
            <div>
                <ExpenseChart expenses={data!} />
            </div>
        </div>
    );
};

export default ExpenseForm;
