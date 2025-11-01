'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    submissionType: 'General',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          submission_type: formData.submissionType,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        organization: '',
        submissionType: 'General',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Get in touch to add your project, publish an investor mandate, or learn more about the platform.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send a Message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 2 business days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="type">Inquiry Type *</Label>
                <Select
                  value={formData.submissionType}
                  onValueChange={(value) => setFormData({ ...formData, submissionType: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General Inquiry</SelectItem>
                    <SelectItem value="Project">Add a Project</SelectItem>
                    <SelectItem value="Investor">Publish Investor Mandate</SelectItem>
                    <SelectItem value="Supplier">Add Supplier Profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Tell us about your project, investment mandate, or inquiry..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">For Project Developers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>List your renewable energy project to reach investors and strategic partners across Europe.</p>
              <p className="text-muted-foreground">No listing fees. Transparent visibility.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">For Investors</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>Publish your investment mandate and connect with vetted project opportunities.</p>
              <p className="text-muted-foreground">Clear deal flow. Quality projects.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">For Suppliers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>Showcase your capabilities to developers and projects seeking EPCs, OEMs, and consultants.</p>
              <p className="text-muted-foreground">Direct access to opportunities.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
