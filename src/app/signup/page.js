"use client";
import { useState } from "react";
import { signUp } from "@/firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AiFillLeftCircle } from "react-icons/ai";
import Link from "next/link";
import { BiLoader } from "react-icons/bi";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
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

  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    function isValidEmail(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }

    if (!formData.username) {
      toast.error("Username is required.");
    } else if (!formData.email) {
      toast.error("Email is required.");
    } else if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
    } else if (!formData.password) {
      toast.error("Password is required.");
    } else if (formData.password.length <= 6) {
      toast.error("Password must be more than 6 characters.");
    } else {
      const { result, error } = await signUp(
        formData.username,
        formData.email,
        formData.password,
      );

      if (error) {
        toast.error(error);
        setIsLoading(false);
      } else {
        toast.success("Account created successfully!");
        router.push("/gallery");
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full md:w-[500px]">
        <Link href="/" className="mx-4 flex my-auto hover:text-gray-100">
          <AiFillLeftCircle size="35px" className="mb-7" />
          <p className="mt-1.5 ml-2 font-semibold">Back to homepage</p>
        </Link>
        <form noValidate onSubmit={handleSignup} className="mx-8">
          <div className="mb-4">
            <label
              className="block text-white font-semibold"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-3 border border-white rounded-md px-3 py-2 w-full bg-transparent text-white focus:outline-none focus:ring focus:border-blue-300"
              placeholder="User"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
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
              placeholder="1Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 bg-white text-black text-md font-bold rounded-md py-2 px-20 hover:bg-gray-200"
          >
            Sign Up
            {isLoading && <BiLoader className="animate-spin" />}
          </button>
          <Link
            href="/login"
            className="mt-5 block text-sm font-medium hover:text-gray-100"
          >
            Have an account? Log In
          </Link>
        </form>
      </div>
    </main>
  );
}
