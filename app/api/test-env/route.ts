import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  return NextResponse.json({
    exists: !!apiKey,
    length: apiKey?.length || 0,
    starts_with: apiKey?.substring(0, 7) || 'undefined',
    ends_with: apiKey?.substring(apiKey.length - 4) || 'undefined',
  });
}
