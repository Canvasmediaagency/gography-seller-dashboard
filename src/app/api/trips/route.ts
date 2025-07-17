import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: trips, error } = await supabase
      .from('trip_information')
      .select('*')
      .order('travel_start_date', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch trips', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ trips, count: trips?.length || 0 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
