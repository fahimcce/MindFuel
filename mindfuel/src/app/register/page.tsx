"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Rocket, User, Phone, Mail, Lock } from "lucide-react";
import { registration } from "@/services/AuthServices";
import { toast } from "sonner";

export default function Register() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
      await registration(registrationData);
      toast.success("Registration successful!");
      navigate.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-6 py-2 bg-blue-600/20 rounded-full border border-blue-400/50 mb-6">
            <Rocket className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium text-blue-200">
              Start Your Journey
            </span>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-300 mb-2">
            Create Your Account
          </h1>
          <p className="text-slate-400">Join thousands of learners worldwide</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
              {errors.form}
            </div>
          )}

          <div>
            <label className="block text-slate-300 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                  errors.name ? "border-red-500" : "border-slate-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white`}
                placeholder="Fahim khan"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                  errors.phone ? "border-red-500" : "border-slate-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                  errors.email ? "border-red-500" : "border-slate-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                  errors.password ? "border-red-500" : "border-slate-700"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Register Now"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
