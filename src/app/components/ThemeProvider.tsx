"use client";

import { useEffect, useRef } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const mainRef = useRef(null);

  useEffect(() => {
    
  }, []);

  return <main ref={mainRef}>{children}</main>;
};

export default ThemeProvider;
