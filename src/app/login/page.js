"use client";
import { useState } from "react";
import { signIn } from "@/firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AiFillLeftCircle } from "react-icons/ai";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("Email is required.");
    } else if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
    } else if (!formData.password) {
      toast.error("Password is required.");
    } else {
      const { result, error } = await signIn(formData.email, formData.password);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Login successful!");
        router.push("/gallery");
      }
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full md:w-[500px]">
        <Link href="/" className="mx-4 flex my-auto hover:text-gray-100">
          <AiFillLeftCircle size="35px" className="mb-7" />
          <p className="mt-1.5 ml-2 font-semibold">Back to homepage</p>
        </Link>
        <form noValidate onSubmit={handleLogin} className="mx-8">
          <div className="mt-2 mb-4">
            <label className="block text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-3 border border-white rounded-md px-3 py-2 w-full bg-transparent text-white focus:outline-none focus:ring focus:border-blue-300"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2 mb-4">
            <label
              className="block text-white font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-3 border border-white rounded-md px-3 py-2 w-full bg-transparent text-white focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="mt-3 bg-white text-black font-semibold rounded-md py-2 px-14 hover:bg-gray-200"
          >
            Log In
          </button>
          <Link
            href="/signup"
            className="mt-5 block text-sm font-medium hover:text-gray-100"
          >
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </main>
  );
}
