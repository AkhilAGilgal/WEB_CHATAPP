
import React, { useState } from 'react';
import SpinnerComponent from './SpinnerComponent';

interface LoginComponentProps {
  onLogin: (username: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin, isLoading, error }) => {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 p-4">
      <div className="bg-card p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">Welcome to ChatApp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-textSecondary mb-2">
              Choose a Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-textPrimary bg-gray-50"
              placeholder="E.g., CoolCat123"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <SpinnerComponent size="w-5 h-5" color="text-white" /> : 'Enter Chat'}
          </button>
        </form>
        <p className="text-xs text-textSecondary mt-6 text-center">
          Your adventure in communication starts here. Pick a cool name!
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
