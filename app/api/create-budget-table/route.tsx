import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const result = await sql`CREATE TABLE TestBudget(amount FLOAT, category VARCHAR(50), description VARCHAR(255), day SMALLINT, month SMALLINT, year SMALLINT)`;
        return NextResponse.json({result}, {status: 200})
    } catch(error) {
        return NextResponse.json({error}, {status: 500})
    }
}