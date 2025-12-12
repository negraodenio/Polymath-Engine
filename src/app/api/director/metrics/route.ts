import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('school_id, role')
        .eq('id', user.id)
        .single()

    // Remove this check for development if 'role' column or users aren't fully set up yet
    /*
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    */

    const { data } = await supabase
        .from('director_metrics')
        .select('*')
        //.eq('school_id', profile.school_id) // Filter by school in prod
        .limit(10)

    return NextResponse.json(data)
}
