// src/app/api/flag/route.js
import { NextResponse } from 'next/server';
import store from '@/app/lib/store';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const usernames = searchParams.getAll('username');
  const password = searchParams.get('password');
  
  // Check if admin parameter is present and user credentials are valid
  const mainUsername = usernames[0];
  const user = store.getUser(mainUsername);
  
  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  if (usernames.includes('admin')) {
    return NextResponse.json({ 
      flag: 'flag{p4r4m3t3r_p0llut10n_byp4ss_4dm1n_4cc3ss}'
    });
  }

  return NextResponse.json({ error: 'Insufficient privileges' }, { status: 403 });
}