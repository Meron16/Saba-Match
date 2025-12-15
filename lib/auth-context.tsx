"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "company" | "government";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    role: "user" | "company" | "government"
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // First, check for government credentials via API
      try {
        const govResponse = await fetch("/api/auth/government", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (govResponse.ok) {
          const govData = await govResponse.json();
          if (govData.success && govData.user) {
            setUser(govData.user);
            localStorage.setItem("user", JSON.stringify(govData.user));
            setIsLoading(false);
            return true;
          }
        }
      } catch (govError) {
        // Not a government user, continue with regular login
        console.log("Not a government account, trying regular login");
      }

      // Try regular login via database API
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        if (loginData.success && loginData.user) {
          setUser(loginData.user);
          localStorage.setItem("user", JSON.stringify(loginData.user));
          setIsLoading(false);
          return true;
        }
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    role: "user" | "company" | "government"
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Create user via database API
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      if (signupResponse.ok) {
        const signupData = await signupResponse.json();
        if (signupData.success && signupData.user) {
          setUser(signupData.user);
          localStorage.setItem("user", JSON.stringify(signupData.user));
          setIsLoading(false);
          return true;
        }
      } else {
        const errorData = await signupResponse.json();
        console.error("Signup error:", errorData.error);
        setIsLoading(false);
        return false;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
