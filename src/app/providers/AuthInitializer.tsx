"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/store/authStore";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
}