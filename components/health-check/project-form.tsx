'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectHealthCheckInput, Technology, Stage, RevenueModel, PPAStatus, GridStatus, PermitStatus, TeamExperience, LandStatus, FinancingStatus } from '@/types/health-check';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ProjectFormProps {
  onSubmit: (data: ProjectHealthCheckInput) => void;
  isLoading?: boolean;
  exampleData?: ProjectHealthCheckInput | null;
}

export function ProjectForm({ onSubmit, isLoading, exampleData }: ProjectFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectHealthCheckInput>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill with example data when provided
  useEffect(() => {
    if (exampleData) {
      setFormData(exampleData);
    }
  }, [exampleData]);

  const totalSteps = 4;

  const updateField = (field: keyof ProjectHealthCheckInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.technology) newErrors.technology = 'Technology is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.capacity_mw || formData.capacity_mw <= 0) newErrors.capacity_mw = 'Valid capacity is required';
      if (!formData.stage) newErrors.stage = 'Development stage is required';
    }

    if (currentStep === 2) {
      if (!formData.capex_eur || formData.capex_eur <= 0) newErrors.capex_eur = 'Valid CAPEX is required';
      if (!formData.revenue_model) newErrors.revenue_model = 'Revenue model is required';
    }

    if (currentStep === 3) {
      if (!formData.ppa_status) newErrors.ppa_status = 'PPA status is required';
      if (!formData.grid_status) newErrors.grid_status = 'Grid status is required';
      if (!formData.permit_status) newErrors.permit_status = 'Permit status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(step)) {
      onSubmit(formData as ProjectHealthCheckInput);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                s < step ? 'bg-emerald-600 border-emerald-600 text-white' :
                s === step ? 'bg-emerald-50 border-emerald-600 text-emerald-600' :
                'bg-white border-slate-300 text-slate-400'
              }`}>
                {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                  s < step ? 'bg-emerald-600' : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Basics</span>
          <span>Financial</span>
          <span>Development</span>
          <span>Optional</span>
        </div>
      </div>

      {/* Step 1: Project Basics */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Project Basics</CardTitle>
            <CardDescription>Core information about your renewable energy project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="technology">Technology Type *</Label>
              <Select value={formData.technology} onValueChange={(value) => updateField('technology', value as Technology)}>
                <SelectTrigger id="technology">
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solar">Solar PV</SelectItem>
                  <SelectItem value="Wind">Wind (Onshore/Offshore)</SelectItem>
                  <SelectItem value="Hydrogen">Green Hydrogen</SelectItem>
                  <SelectItem value="Storage">Battery Storage</SelectItem>
                  <SelectItem value="Hydro">Hydropower</SelectItem>
                </SelectContent>
              </Select>
              {errors.technology && <p className="text-sm text-red-600">{errors.technology}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => updateField('country', value)}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Spain">Spain</SelectItem>
                  <SelectItem value="Italy">Italy</SelectItem>
                  <SelectItem value="Poland">Poland</SelectItem>
                  <SelectItem value="Netherlands">Netherlands</SelectItem>
                  <SelectItem value="Belgium">Belgium</SelectItem>
                  <SelectItem value="Denmark">Denmark</SelectItem>
                  <SelectItem value="Sweden">Sweden</SelectItem>
                  <SelectItem value="Finland">Finland</SelectItem>
                  <SelectItem value="Portugal">Portugal</SelectItem>
                  <SelectItem value="Greece">Greece</SelectItem>
                  <SelectItem value="Austria">Austria</SelectItem>
                  <SelectItem value="Romania">Romania</SelectItem>
                  <SelectItem value="Other EU">Other EU Country</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-red-600">{errors.country}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity_mw">Capacity (MW) *</Label>
              <Input
                id="capacity_mw"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 50"
                value={formData.capacity_mw || ''}
                onChange={(e) => updateField('capacity_mw', parseFloat(e.target.value))}
              />
              {errors.capacity_mw && <p className="text-sm text-red-600">{errors.capacity_mw}</p>}
              <p className="text-xs text-muted-foreground">Typical range: Solar 10-200 MW, Wind 50-500 MW</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Development Stage *</Label>
              <Select value={formData.stage} onValueChange={(value) => updateField('stage', value as Stage)}>
                <SelectTrigger id="stage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Feasibility">Feasibility Study</SelectItem>
                  <SelectItem value="Permitting">Permitting</SelectItem>
                  <SelectItem value="Construction">Ready-to-Build / Construction</SelectItem>
                  <SelectItem value="Operational">Operational</SelectItem>
                </SelectContent>
              </Select>
              {errors.stage && <p className="text-sm text-red-600">{errors.stage}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Financial Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
            <CardDescription>Investment requirements and expected returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="capex_eur">Total CAPEX (EUR) *</Label>
              <Input
                id="capex_eur"
                type="number"
                step="1000"
                min="0"
                placeholder="e.g., 50000000"
                value={formData.capex_eur || ''}
                onChange={(e) => updateField('capex_eur', parseFloat(e.target.value))}
              />
              {errors.capex_eur && <p className="text-sm text-red-600">{errors.capex_eur}</p>}
              <p className="text-xs text-muted-foreground">
                Benchmark: Solar €800k-1.2M/MW, Wind €1.3M-1.8M/MW
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected_irr">Expected IRR (%)</Label>
              <Input
                id="expected_irr"
                type="number"
                step="0.1"
                min="0"
                max="30"
                placeholder="e.g., 8.5"
                value={formData.expected_irr || ''}
                onChange={(e) => updateField('expected_irr', parseFloat(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Typical range: 6-12% for European projects</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue_model">Revenue Model *</Label>
              <Select value={formData.revenue_model} onValueChange={(value) => updateField('revenue_model', value as RevenueModel)}>
                <SelectTrigger id="revenue_model">
                  <SelectValue placeholder="Select revenue model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PPA">PPA (Power Purchase Agreement)</SelectItem>
                  <SelectItem value="Mixed">Mixed (PPA + Merchant)</SelectItem>
                  <SelectItem value="Merchant">Merchant (Market Exposure)</SelectItem>
                </SelectContent>
              </Select>
              {errors.revenue_model && <p className="text-sm text-red-600">{errors.revenue_model}</p>}
              <p className="text-xs text-muted-foreground">PPA provides stable, predictable revenues</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Development Status */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Development Status</CardTitle>
            <CardDescription>Current progress on critical milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ppa_status">PPA Status *</Label>
              <Select value={formData.ppa_status} onValueChange={(value) => updateField('ppa_status', value as PPAStatus)}>
                <SelectTrigger id="ppa_status">
                  <SelectValue placeholder="Select PPA status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Signed">Signed PPA</SelectItem>
                  <SelectItem value="Negotiation">Under Negotiation</SelectItem>
                  <SelectItem value="None">No PPA Yet</SelectItem>
                  <SelectItem value="Not Applicable">Not Applicable (Merchant)</SelectItem>
                </SelectContent>
              </Select>
              {errors.ppa_status && <p className="text-sm text-red-600">{errors.ppa_status}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grid_status">Grid Connection Status *</Label>
              <Select value={formData.grid_status} onValueChange={(value) => updateField('grid_status', value as GridStatus)}>
                <SelectTrigger id="grid_status">
                  <SelectValue placeholder="Select grid status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Connected">Connected</SelectItem>
                  <SelectItem value="Secured">Secured (Signed Agreement)</SelectItem>
                  <SelectItem value="Application Submitted">Application Submitted</SelectItem>
                  <SelectItem value="Planning">Planning Phase</SelectItem>
                </SelectContent>
              </Select>
              {errors.grid_status && <p className="text-sm text-red-600">{errors.grid_status}</p>}
              <p className="text-xs text-muted-foreground">Grid delays are common: Germany 2-4 years, Poland 3-5 years</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permit_status">Permitting Status *</Label>
              <Select value={formData.permit_status} onValueChange={(value) => updateField('permit_status', value as PermitStatus)}>
                <SelectTrigger id="permit_status">
                  <SelectValue placeholder="Select permit status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Obtained">All Permits Obtained</SelectItem>
                  <SelectItem value="In Progress">Permitting In Progress</SelectItem>
                  <SelectItem value="Not Started">Not Yet Started</SelectItem>
                </SelectContent>
              </Select>
              {errors.permit_status && <p className="text-sm text-red-600">{errors.permit_status}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected_cod">Expected COD (Commercial Operation Date)</Label>
              <Input
                id="expected_cod"
                type="month"
                placeholder="YYYY-MM"
                value={formData.expected_cod || ''}
                onChange={(e) => updateField('expected_cod', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Format: YYYY-MM (e.g., 2026-06)</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Optional Details */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Optional Details</CardTitle>
            <CardDescription>Additional information to improve analysis accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team_experience">Team Experience</Label>
              <Select value={formData.team_experience} onValueChange={(value) => updateField('team_experience', value as TeamExperience)}>
                <SelectTrigger id="team_experience">
                  <SelectValue placeholder="Select team experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Project">First Project</SelectItem>
                  <SelectItem value="2-5 Projects">2-5 Delivered Projects</SelectItem>
                  <SelectItem value="5+ Projects">5+ Delivered Projects</SelectItem>
                  <SelectItem value="Experienced Developer">Experienced Developer (10+ Projects)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="land_status">Land Status</Label>
              <Select value={formData.land_status} onValueChange={(value) => updateField('land_status', value as LandStatus)}>
                <SelectTrigger id="land_status">
                  <SelectValue placeholder="Select land status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owned">Land Owned</SelectItem>
                  <SelectItem value="Leased">Land Leased (Long-term)</SelectItem>
                  <SelectItem value="Option">Option to Purchase/Lease</SelectItem>
                  <SelectItem value="Under Negotiation">Under Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="financing_status">Financing Status</Label>
              <Select value={formData.financing_status} onValueChange={(value) => updateField('financing_status', value as FinancingStatus)}>
                <SelectTrigger id="financing_status">
                  <SelectValue placeholder="Select financing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Closed">Financial Close</SelectItem>
                  <SelectItem value="Term Sheet">Term Sheet Signed</SelectItem>
                  <SelectItem value="Searching">Searching for Financing</SelectItem>
                  <SelectItem value="Self-Funded">Self-Funded / Balance Sheet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="offtaker_name">Offtaker Name (if PPA signed)</Label>
              <Input
                id="offtaker_name"
                type="text"
                placeholder="e.g., Deutsche Bahn, Vattenfall"
                value={formData.offtaker_name || ''}
                onChange={(e) => updateField('offtaker_name', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Investment-grade offtakers significantly improve project quality</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {step < totalSteps ? (
          <Button onClick={handleNext} disabled={isLoading}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
            {isLoading ? 'Analyzing...' : 'Analyze Project'}
          </Button>
        )}
      </div>
    </div>
  );
}
