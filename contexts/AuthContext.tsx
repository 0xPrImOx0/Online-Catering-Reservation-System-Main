"use client";

import { CustomerProps } from "@/types/customer-types";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";
import { IAuthContext } from "@/types/auth-types";

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

        setCustomer(res.data.customer);
      } catch (err) {
        setCustomer(null);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentCustomer();
  }, [customer]);

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
