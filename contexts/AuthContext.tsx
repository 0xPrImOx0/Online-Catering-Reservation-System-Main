"use client";

import { CustomerProps } from "@/types/customer-types";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";
import { IAuthContext } from "@/types/auth-types";
import axios from "axios";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCurrentCustomer = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/auth/me");
        toast(<div className="p-4">{JSON.stringify(res, null, 2)}</div>);

        console.log(res);

        setCustomer(res.data.customer);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          try {
            const refreshRes = await api.post("/auth/refresh");

            if (refreshRes.status !== 200) setCustomer(null);

            const retryRes = await api.get("/auth/me");

            setCustomer(retryRes.data.customer);
          } catch (refreshErr) {
            setCustomer(null);
            console.log(
              "Refresh token expired or invalid / Customer not authenticated!",
              refreshErr
            );
          }
        } else {
          setCustomer(null);
          console.error("Unhandled error in auth", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentCustomer();
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
