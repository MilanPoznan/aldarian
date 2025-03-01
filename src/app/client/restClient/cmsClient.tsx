'use client'
import CmsClient from "@/app/providers/restProvider";
import React, { useContext } from "react";

const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || '';
const cmsClient = new CmsClient(cmsApiUrl);

const CmsClientContext = React.createContext<CmsClient | null>(null);

export const CmsClientProvider = ({ children }) => {
  return (
    <CmsClientContext.Provider value={cmsClient}>
      {children}
    </CmsClientContext.Provider>
  );
};

export const useCmsClient = () => {
  const context = useContext(CmsClientContext);
  if (!context) {
    throw new Error("useCmsClient must be used within a CmsClientProvider");
  }
  return context
}