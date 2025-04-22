"use client";

import { CustomerProps } from "@/types/customer-types";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { IAuthContext } from "@/types/auth-types";
import axios from "axios";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(false);

  const getCurrentCustomer = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/auth/me");
      // toast(<div className="p-4">{JSON.stringify(res, null, 2)}</div>);
      setCustomer(res.data.customer);
    } catch (err: unknown) {
      // console.log("ERRORRR IN AUTH CONTEXT", err);
      if (!axios.isAxiosError(err) || err.response?.status !== 401) {
        setCustomer(null);
        console.error("Unexpected Error:", err);
        return;
      }

      try {
        const refreshRes = await api.post("/auth/refresh");

        if (refreshRes.status !== 200) setCustomer(null);

        const retryRes = await api.get("/auth/me");
        setCustomer(retryRes.data.customer);
      } catch (refreshErr) {
        setCustomer(null);
        console.log("Refresh token expired or invalid!", refreshErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentCustomer();
  }, []);

  useEffect(() => {
    if (refresh) {
      getCurrentCustomer();
      setRefresh(false); // reset trigger
    }
  }, [refresh]);

  // Listen to custom event from anywhere
  useEffect(() => {
    const handler = () => setRefresh(true);
    window.addEventListener("refresh-customer", handler);

    return () => window.removeEventListener("refresh-customer", handler);
  }, []);

  return (
    <AuthContext.Provider value={{ customer, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
