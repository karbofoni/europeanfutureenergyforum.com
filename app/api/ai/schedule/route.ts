import { NextRequest, NextResponse } from 'next/server';
import { SchedulerRequest, SchedulerResponse } from '@/types/ai';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per minute per IP
  const clientId = getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(clientId, 10);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: rateLimitResult.headers,
      }
    );
  }

  try {
    const body: SchedulerRequest = await request.json();

    const mockResponse: SchedulerResponse = {
      sessions: [
        {
          session_id: 's1',
          title: 'Offshore Wind: Scaling to 100 GW',
          reason: 'Matches your interest in wind energy and large-scale projects',
          priority: 'high',
        },
        {
          session_id: 's2',
          title: 'Green Hydrogen Economics',
          reason: 'Relevant to emerging technology interests',
          priority: 'medium',
        },
        {
          session_id: 's3',
          title: 'Permitting Reform: Progress and Gaps',
          reason: 'Important for all project developers',
          priority: 'high',
        },
      ],
      intros: [
        {
          name: 'Jane Doe',
          role: 'Investment Director',
          organization: 'Alpine Energy Partners',
          reason: 'Active investor in your technology and geography',
          suggested_time: 'Day 1, 12:30 PM - Networking Lunch',
        },
        {
          name: 'Lars Nielsen',
          role: 'Head of Hydrogen',
          organization: 'Nordic Clean Capital',
          reason: 'Leading hydrogen investment strategy in Northern Europe',
          suggested_time: 'Day 2, 10:00 AM - Coffee Break',
        },
      ],
      schedule: [
        {
          time: '09:00 - 10:30',
          activity: 'Offshore Wind: Scaling to 100 GW',
          location: 'Main Hall A',
          type: 'session',
        },
        {
          time: '11:00 - 12:30',
          activity: 'Green Hydrogen Economics',
          location: 'Room 2B',
          type: 'session',
        },
        {
          time: '12:30 - 13:30',
          activity: 'Networking Lunch + Meeting with Jane Doe',
          location: 'Exhibition Hall',
          type: 'meeting',
        },
        {
          time: '14:00 - 15:30',
          activity: 'Permitting Reform: Progress and Gaps',
          location: 'Main Hall B',
          type: 'session',
        },
      ],
    };

    return NextResponse.json({
      ...mockResponse,
      disclaimer: 'Schedule suggestions are AI-generated. Confirm availability with participants.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate schedule' },
      { status: 500 }
    );
  }
}
