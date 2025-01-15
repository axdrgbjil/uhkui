// src/app/login/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const loginResponse = await fetch(
        `/api/login?username=${username}&password=${password}`
      );
      const loginData = await loginResponse.json();
      
      if (loginResponse.ok) {
        setResult(JSON.stringify(loginData, null, 2));
        setError('');
      } else {
        setError(loginData.error);
        setResult('');
      }
    } catch (err) {
      setError('An error occurred');
      setResult('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-6 flex flex-col justify-center">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="relative bg-black/30 backdrop-blur-xl px-4 py-10 shadow-xl rounded-3xl sm:p-20 border border-gray-800">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
              Login Account
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 
                         rounded-lg transition-colors duration-200
                         font-medium text-white shadow-lg"
              >
                Login
              </button>
            </form>

            {error && (
              <div className="mt-4 text-red-400 bg-red-900/20 p-4 rounded-lg">
                {error}
              </div>
            )}
            {result && (
              <pre className="mt-4 bg-gray-800/50 p-4 rounded-lg overflow-auto text-green-400 font-mono text-sm">
                {result}
              </pre>
            )}

            <div className="mt-6 text-center">
              <Link 
                href="/register" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Register here
              </Link>
              <div className="mt-4 rounded-lg ">
              
              <button 
                onClick={() => setShowHint(!showHint)}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
              >
                {showHint ? '🔒 Hide Hint' : '💡 Need a hint?'}
              </button>
              {showHint && (
                <div className="mt-4 text-gray-400 text-sm">
                  <p>URLs can be interesting... </p>
                  <p>especially the parameters</p>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}