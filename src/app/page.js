// src/app/page.js (Root page - redirects to login)
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
}