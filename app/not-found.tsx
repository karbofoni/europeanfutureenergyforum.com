import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container py-12 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
          <CardTitle>Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/">
            <Button className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Browse Projects
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
