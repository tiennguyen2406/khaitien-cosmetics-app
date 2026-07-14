import RegisterForm from "@/auth/register/RegisterForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    "Đăng ký",
};
export default function RegisterApp() {
  return <RegisterForm />;
}