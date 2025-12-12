import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data } = await supabase.from('quantum_progress').select('*').limit(1)

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
