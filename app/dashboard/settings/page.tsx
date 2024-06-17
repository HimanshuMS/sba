"use client"
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

export default function Settings() {
  const [limit, setLimit] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('spendingLimit', limit.toString());
    alert(`Spending limit set to ${limit}`);
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
                            <Label htmlFor="limit">Limit</Label>
                            <Input id="limit" type='number' onChange={(e) => setLimit(Number(e.target.value))} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button type='submit' onClick={handleSubmit}>Add Expense</Button>
            </CardFooter>
        </Card>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="number"
    //       value={limit}
    //       onChange={(e) => setLimit(Number(e.target.value))}
    //       placeholder="Monthly Spending Limit"
    //       required
    //     />
    //     <button type="submit">Set Limit</button>
    //   </form>
    // </div>
  );
}
