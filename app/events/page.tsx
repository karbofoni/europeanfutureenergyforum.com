import Image from 'next/image';
import { getShimmerDataURL } from '@/lib/image-blur';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | Transition Nexus Europe',
  description: 'Upcoming clean energy events and networking opportunities across Europe. Discover conferences, summits, and industry gatherings for renewable energy professionals.',
  alternates: {
    canonical: './'
  }
};

export const revalidate = 60;

async function getEvents(): Promise<Event[]> {
  const { data } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true });
  return data || [];
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Conference event"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={getShimmerDataURL()}
          />
        </div>
        <div className="container relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Events</h1>
            <p className="text-lg text-muted-foreground">
              Discover upcoming clean energy events and use our smart scheduler to plan your agenda.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No upcoming events. Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {events.map((event) => (
            <Card key={event.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                    <CardDescription className="text-base">{event.description}</CardDescription>
                  </div>
                  <Badge>{event.event_type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dates</p>
                        <p className="font-medium">
                          {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  {event.sessions && event.sessions.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Featured Sessions</h4>
                      <div className="space-y-2">
                        {event.sessions.slice(0, 3).map((session: any) => (
                          <div key={session.id} className="p-3 bg-slate-50 rounded">
                            <p className="font-medium text-sm">{session.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{session.track}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-12 bg-emerald-50 border-emerald-200 max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Smart Event Scheduler (Coming Soon)</CardTitle>
          <CardDescription>
            AI-powered agenda builder and networking recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our smart scheduler will help you build personalized agendas, identify relevant sessions,
            and suggest 1:1 meeting opportunities based on your interests and goals.
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
