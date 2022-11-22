import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rhlbiblqwztevviyvtgr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJobGJpYmxxd3p0ZXZ2aXl2dGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkwNTM4MjgsImV4cCI6MTk4NDYyOTgyOH0.OpgbmgKde21qkK2ZGLGIIPmjqNba1ei1JzUwwhkfVfc"   
const supabase = createClient(supabaseUrl, supabaseKey)

export function videoService(){
    return{
        getAllVideos(){
          return   supabase.from("video")
            .select("*")
            
        }
    }
}