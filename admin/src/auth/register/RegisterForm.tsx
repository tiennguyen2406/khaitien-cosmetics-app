"use client"

import { useState } from "react"
import type React from "react"

import validator from "validator"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "react-toastify"
import { authApi, getAuthErrorMessage } from "@/auth/auth-api"

const RegisterForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validationError, setValidationError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [fullName, setFullName] = useState("")
  const [fullNameError, setFullNameError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Kiểm tra định dạng email
  const isValidEmailFormat = (email: string): boolean => {
    const atIndex = email.indexOf("@")
    if (atIndex === -1) return false
    const domainPart = email.slice(atIndex + 1)
    return domainPart.includes(".")
  }

  // Kiểm tra email với API
  const checkEmail = async (email: string) => {
    try {
      const isAvailable = await authApi.checkEmail(email)
      if (!isAvailable) {
        setEmailError("Email đã tồn tại trong hệ thống")
      }
    } catch (error: unknown) {
      console.error("Lỗi khi kiểm tra email:", error)
      setEmailError("Lỗi xác thực email. Vui lòng thử lại.")
    }
  }

  // Xử lý khi email thay đổi
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setEmailError("")
  }

  // Xử lý khi người dùng rời khỏi input email
  const handleEmailBlur = () => {
    if (!email) return
    if (!isValidEmailFormat(email)) {
      setEmailError("Email không hợp lệ")
      return
    }
    checkEmail(email)
  }

  const handleFullNameBlur = () => {
    if (!fullName) return
    setFullNameError("")
  }

  const validateForm = (): boolean => {
    if (!email) {
      setValidationError("Vui lòng nhập email.")
      return false
    }
    if (!isValidEmailFormat(email)) {
      setValidationError("Email không hợp lệ")
      return false
    }
    if (emailError) {
      setValidationError(emailError)
      return false
    }
    if (!validator.isLength(password, { min: 6 })) {
      setValidationError("Mật khẩu phải có ít nhất 6 ký tự.")
      return false
    }
    if (!validator.equals(password, confirmPassword)) {
      setValidationError("Mật khẩu xác nhận không khớp.")
      return false
    }
    setValidationError("")
    return true
  }

  const handleGoogleLogin = () => {
    console.log("Đăng nhập bằng Google.")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      await authApi.register({
        email: email.trim().toLowerCase(),
        password,
        fullName: fullName.trim(),
      })
      toast.success("Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.")
      router.push("/login")
    } catch (error: unknown) {
      setValidationError(
        getAuthErrorMessage(error, "Đăng ký thất bại, vui lòng thử lại.")
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFullName = e.target.value
    setFullName(newFullName)
    setFullNameError("")
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
          alt="Hình nền đăng ký"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#FFFAF5] via-[#FFF5EE]/90 to-[#C04040]/30" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border border-[#D4AF37]/50">
                <span className="font-serif text-xl text-[#D4AF37]">H</span>
              </div>
              <div>
                <span className="block text-xl font-light tracking-[0.2em] text-[#3D2010]">
                  HERITAGE GATE
                </span>
                <span className="block text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]">
                  Fine Dining & Events
                </span>
              </div>
            </Link>
          </div> */}

          <div className="bg-white/80 p-10 shadow-2xl backdrop-blur-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-light text-[#3D2010]">Đăng ký</h1>
              <p className="mt-2 text-sm text-[#7A6050]">
                Đăng ký để bắt đầu
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm text-[#3D2010]"
                >
                  Họ và tên <span className="text-[#C04040]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={fullName}
                  onChange={handleFullNameChange}
                  onBlur={handleFullNameBlur}
                  className={`w-full border-b bg-transparent px-0 py-3 text-[#3D2010] placeholder:text-[#7A6050] focus:outline-none ${fullNameError
                      ? "border-red-500"
                      : "border-[#D4A88A] focus:border-[#C04040]"
                    }`}
                  required
                />
                {fullNameError && (
                  <p className="mt-1 text-sm text-red-500">{fullNameError}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-[#3D2010]">
                  Email <span className="text-[#C04040]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ban@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={`w-full border-b bg-transparent px-0 py-3 text-[#3D2010] placeholder:text-[#7A6050] focus:outline-none ${emailError
                      ? "border-red-500"
                      : "border-[#D4A88A] focus:border-[#C04040]"
                    }`}
                  required
                />
                {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-[#3D2010]"
                >
                  Mật khẩu <span className="text-[#C04040]">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-[#D4A88A] bg-transparent px-0 py-3 text-[#3D2010] placeholder:text-[#7A6050] focus:border-[#C04040] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm text-[#3D2010]"
                >
                  Nhập lại mật khẩu <span className="text-[#C04040]">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b border-[#D4A88A] bg-transparent px-0 py-3 text-[#3D2010] placeholder:text-[#7A6050] focus:border-[#C04040] focus:outline-none"
                  required
                />
              </div>

              {validationError && (
                <div className="rounded bg-red-100 px-4 py-3 text-sm text-red-600">
                  {validationError}
                </div>
              )}

              <button
                type="submit"
                disabled={!!emailError || isSubmitting}
                className="w-full bg-[#C04040] py-4 text-sm font-medium tracking-wider text-white transition-all duration-300 hover:bg-[#8B3030] disabled:opacity-50"
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
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
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-[#C04040] transition-colors hover:text-[#8B3030]"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
