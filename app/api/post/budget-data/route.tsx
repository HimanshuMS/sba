import { sql } from '@vercel/postgres'
import { useParams } from 'next/navigation';
import { NextResponse } from 'next/server'
import React from 'react';

export async function POST(request: Request) {
    const params = await request.json()
    try {
        const insert_res = await sql`INSERT INTO TestBudget(amount, category, description, day, month, year) values (${params.amount}, ${params.category}, ${params.description}, ${params.day}, ${params.month}, ${params.year})`;
        const result = await sql`SELECT * FROM TestBudget`;
        return NextResponse.json({result}, {status: 200})
    } catch(error) {
        return NextResponse.json({error}, {status: 500})
    }
}

export async function GET(request: Request) {
    try {
        const result = await sql`SELECT * FROM TestBudget`;
        return NextResponse.json({result}, {status: 200})
    } catch(error) {
        return NextResponse.json({error}, {status: 500})
    }
}