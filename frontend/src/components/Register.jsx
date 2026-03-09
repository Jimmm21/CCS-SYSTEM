import React, { useState } from 'react';
import { UserPlus, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FACULTY',
    tenantId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          tenant_id: formData.tenantId || null
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Registration successful! Please login.');
        setTimeout(() => {
          onRegisterSuccess();
          onSwitchToLogin();
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full min-h-[600px]"
      >
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <img
              src="/university-of-cabuyao.png"
              alt="University Logo"
              className="h-20 mb-4"
            />
            <h1 className="text-2xl font-bold text-emerald-800 text-center">Create Your Account</h1>
            <p className="text-sm text-gray-500 mt-2">Join CCS Student Profiling System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <CheckCircle size={18} />
                <span className="text-sm">{success}</span>
              </div>
            )}

            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <select
                name="role"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="FACULTY">Faculty</option>
                <option value="DEAN">Dean</option>
                <option value="CHAIR">Chair</option>
                <option value="SECRETARY">Secretary</option>
              </select>
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password (min. 6 characters)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="text"
                name="tenantId"
                placeholder="Tenant ID (Optional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                value={formData.tenantId}
                onChange={handleChange}
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty if not using multitenant</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center justify-center gap-2"
              >
                <LogIn size={16} />
                Login Instead
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 bg-zinc-900 relative overflow-hidden hidden md:flex items-center justify-center p-12">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://picsum.photos/seed/ccs/1000/1000" 
              alt="Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 text-center">
            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center p-6 border-8 border-orange-600 shadow-2xl mb-8 mx-auto">
               <img
                src="/ccs-logo.png"
                alt="CCS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-white text-3xl font-bold tracking-wider">COLLEGE OF COMPUTING STUDIES</h2>
            <p className="text-orange-400 mt-2 font-medium">PAMANTASAN NG CABUYAO</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

