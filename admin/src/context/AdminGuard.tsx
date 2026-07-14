"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";
import { toast } from "react-toastify";
interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const {
    isAuthenticated,
    hasAdminAccess,
    user,
    verifyToken,
  } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [checkAttempts, setCheckAttempts] = useState(0);
  const publicPaths = ["/login", "/register", "/forgot-password", "/reset-password"];
  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    // Verify authentication from cookie
    const ensureAuthenticated = async () => {
      if (!isAuthenticated && checkAttempts < 3) {
        console.log(
          "Not authenticated, trying to verify token from cookie..."
        );
        await verifyToken();
        setCheckAttempts((prev) => prev + 1);
      }
    };

    ensureAuthenticated();
  }, [isAuthenticated, verifyToken, checkAttempts]);

  useEffect(() => {
    const checkAccess = async () => {
      if (isPublicPath) {
        setIsChecking(false);
        return;
      }

      setIsChecking(true);

      console.log("AdminGuard checking access with data:", {
        isAuthenticated,
        hasAdminRole: user?.role === "admin" || user?.role === "staff" || user?.role === "super_admin",
        userRole: user?.role,
        permissionCount: user?.permissions?.length || 0,
        pathname,
      });

      // Nếu chưa đăng nhập, chuyển về login
      if (!isAuthenticated) {
        if (checkAttempts < 3) {
          console.log(
            "Not authenticated, waiting for auth state to update..."
          );
          return; // Đợi cho xác thực hoàn tất ở useEffect trên
        }

        console.log("User not authenticated");
        router.replace("/login");
        return;
      }

      // Nếu không có quyền admin/staff/manager, chuyển về login
      if (!hasAdminAccess()) {
        console.log("User has no admin access");
        toast.error("Bạn không có quyền truy cập trang quản trị");
        router.replace("/login");
        return;
      }

      console.log("Access check passed for:", pathname);
      setIsChecking(false);
    };

    checkAccess();
  }, [
    isAuthenticated,
    hasAdminAccess,
    router,
    pathname,
    user,
    checkAttempts,
    isPublicPath,
  ]);

  if (isPublicPath) {
    return <>{children}</>;
  }

  // Show loading spinner while checking permissions
  if (isChecking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-3 mx-auto"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
          {checkAttempts > 0 && (
            <p className="text-gray-500 text-sm mt-2">
              Đang thử lại lần {checkAttempts}/3...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !hasAdminAccess()) {
    return null;
  }

  if (pathname === "/") {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default AdminGuard;
