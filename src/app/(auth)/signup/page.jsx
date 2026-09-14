"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { authClient } from "@/lib/auth-client"; // আপনার better-auth ক্লায়েন্ট ইন্সট্যান্সের পাথ

export default function AdminSignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin", // এক মাত্র রোল 'admin'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // ১. আগে চেক করা হচ্ছে Admin ইতোমধ্যে রয়েছে কি না
            const res = await fetch("/api/auth/check-admin");
            const data = await res.json();

            if (data.exists) {
                toast.error("admin already exist");
                setLoading(false);
                return;
            }

            // ২. Admin না থাকলে Better Auth দিয়ে সাইনআপ সম্পন্ন হবে
            const { data: authData, error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                role: formData.role, // role: "admin" পাস হচ্ছে
            });

            if (error) {
                toast.error(error.message || "Failed to create admin account");
            } else {
                toast.success("Admin account created successfully!");
                router.push("/dashboard");
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <Toaster position="top-right" />
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Admin Registration
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        One-time signup for system administrator
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your name here"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="admin@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Role Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                        </label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            readOnly
                            className="mt-1 block w-full capitalize cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-300"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {showPassword ? (
                                    <HiOutlineEyeOff className="h-5 w-5" />
                                ) : (
                                    <HiOutlineEye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {showConfirmPassword ? (
                                    <HiOutlineEyeOff className="h-5 w-5" />
                                ) : (
                                    <HiOutlineEye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Sign Up as Admin"}
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/auth/signin"
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}