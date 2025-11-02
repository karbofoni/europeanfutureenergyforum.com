import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate report ID format
    if (!id || !/^HC-\d+-[a-z0-9]+$/.test(id)) {
      return NextResponse.json(
        { error: 'Invalid report ID format' },
        { status: 400 }
      );
    }

    // Fetch report from database
    const { data: report, error } = await supabase
      .from('health_check_reports')
      .select('*')
      .eq('report_id', id)
      .single();

    if (error || !report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Increment view count
    try {
      await supabase.rpc('increment_report_views', {
        report_id_param: id
      });
    } catch (viewError) {
      // Ignore view count errors
      console.error('Failed to increment view count:', viewError);
    }

    // Return report data
    return NextResponse.json({
      report_id: report.report_id,
      created_at: report.created_at,
      overall_score: report.overall_score,
      score_category: report.score_category,
      quick_summary: report.quick_summary,
      category_scores: report.category_scores,
      red_flags: report.red_flags,
      recommendations: report.recommendations,
      benchmarks: report.benchmarks,
      comparable_projects_count: report.comparable_projects_count,
      percentile_rank: report.percentile_rank,
      investor_readiness: report.investor_readiness,
      project_data: report.project_data,
    });

  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}
