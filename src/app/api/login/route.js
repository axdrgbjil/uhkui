// src/app/api/login/route.js
import { NextResponse } from 'next/server';
import store from '@/app/lib/store';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const usernames = searchParams.getAll('username');
    const password = searchParams.get('password');
    const mainUsername = usernames[0];

    console.log('Login attempt:', {
      usernames,
      password,
      mainUsername
    });

    if (!usernames.length || !password) {
      console.log('Missing credentials');
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const user = store.getUser(mainUsername);
    console.log('Found user:', user);

    if (!user || user.password !== password) {
      console.log('Invalid credentials for user:', mainUsername);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Base response with user flag
    const response = {
      message: 'Login successful!',
      username: mainUsername,
      role: user.role,
      note: 'keeepppppp goiiinnngggg.....'
    };

    // Check for parameter pollution attempt
    if (usernames.length > 1 && usernames.includes('admin')) {
      response.role = 'admin';
      response.admin_flag = 'flag{p4r4m3t3r_p0llut10n_byp4ss_4dm1n_4cc3ss}';
      response.message = 'Congratulations! 🥳';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
