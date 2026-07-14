"use client";
import { useState } from "react";
import type React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { authApi, getAuthErrorMessage } from "@/auth/auth-api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [emailHint, setEmailHint] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const { login: authLogin } = useAuth();

  const handleEmailBlur = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setEmailHint("");
      return;
    }

    setIsCheckingEmail(true);
    try {
      const isAvailable = await authApi.checkEmail(normalizedEmail);
      setEmailHint(isAvailable ? "Email này chưa được đăng ký." : "");
    } catch {
      setEmailHint("");
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      toast.error("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await authApi.login({
        email: normalizedEmail,
        password,
      });
      await authLogin(response.token, response.refreshToken);
      toast.success("Đăng nhập thành công!");
    } catch (error: unknown) {
      toast.error(
        getAuthErrorMessage(error, "Đăng nhập thất bại, vui lòng thử lại.")
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Đăng nhập bằng Google.");
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
          alt="Nền đăng nhập"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#FFFAF5] via-[#FFF5EE]/90 to-[#C04040]/30" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">

          <div className="bg-white/80 p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-light text-[#3D2010]">Đăng nhập</h1>
              <p className="mt-2 text-sm text-[#7A6050]">
                Đăng nhập vào tài khoản của bạn
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-[#3D2010]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailHint) {
                      setEmailHint("");
                    }
                  }}
                  onBlur={handleEmailBlur}
                  required
                  className="w-full border-b border-[#D4A88A] bg-transparent px-0 py-3 text-[#3D2010] placeholder:text-[#7A6050] focus:border-[#C04040] focus:outline-none"
                />
                {isCheckingEmail && (
                  <p className="mt-2 text-xs text-[#7A6050]">Đang kiểm tra email...</p>
                )}
                {!isCheckingEmail && emailHint && (
                  <p className="mt-2 text-xs text-[#C04040]">{emailHint}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-[#3D2010]"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-b border-[#D4A88A] bg-transparent px-0 py-3 text-[#3D2010] placeholder:text-[#7A6050] focus:border-[#C04040] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[#D4A88A] bg-transparent text-[#C04040] focus:ring-[#C04040]"
                  />
                  <span className="text-sm text-[#7A6050]">Ghi nhớ đăng nhập</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#C04040] transition-colors hover:text-[#8B3030]"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-[#C04040] py-4 text-sm font-medium tracking-wider text-white transition-all duration-300 hover:bg-[#8B3030] disabled:opacity-50"
              >
                {isLoggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 border-t border-[#D4A88A]" />
              <span className="text-xs text-[#7A6050]">Hoặc tiếp tục với</span>
              <div className="flex-1 border-t border-[#D4A88A]" />
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex w-full items-center justify-center gap-2 border border-[#D4A88A] py-3 text-sm text-[#3D2010] transition-colors hover:border-[#C04040] hover:text-[#C04040]"
            >
              <Image
                src="/google-icon.svg"
                alt="Google"
                className="h-5 w-5"
                width={20}
                height={20}
              />
              Đăng nhập với Google
            </button>

            <p className="mt-8 text-center text-sm text-[#7A6050]">
              Bạn chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="text-[#C04040] transition-colors hover:text-[#8B3030]"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
