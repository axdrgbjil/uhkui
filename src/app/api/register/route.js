// src/app/api/register/route.js
import { NextResponse } from 'next/server';
import store from '@/app/lib/store';

export async function POST(request) {
  try {
    const data = await request.json();
    const { username, password } = data;

    console.log('Registration attempt:', {
      username,
      password
    });

    if (!username || !password) {
      console.log('Missing registration fields');
      return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
    }

    const success = store.addUser(username, password);
    console.log('Registration success:', success);

    if (!success) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }
    
    return NextResponse.json({ 
      message: 'Registration successful',
      debug: {
        userExists: store.getUser(username) !== undefined
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}