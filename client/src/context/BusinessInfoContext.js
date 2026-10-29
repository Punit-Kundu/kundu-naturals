import React, { createContext, useContext, useEffect, useState } from 'react';

const fallbackBusinessInfo = {
  phone: '9034677123',
  email: 'kundupunit927@gmail.com',
  whatsapp: '919034677123',
  address: 'Kundu Naturals, Village Kailram, District Kaithal, Haryana, India',
};

const BusinessInfoContext = createContext(fallbackBusinessInfo);

export function BusinessInfoProvider({ children }) {
  const [businessInfo, setBusinessInfo] = useState(fallbackBusinessInfo);

  useEffect(() => {
    const controller = new AbortController();

    const loadBusinessInfo = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/contact`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Contact information request failed (${response.status})`);
        }

        const result = await response.json();
        if (!result?.success || !result?.data) {
          throw new Error('Contact information response was invalid');
        }

        setBusinessInfo((current) => ({
          phone: result.data.phone || current.phone,
          email: result.data.email || current.email,
          whatsapp: result.data.whatsapp || current.whatsapp,
          address: result.data.address || current.address,
        }));
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.warn('Unable to load business information', error);
        }
      }
    };

    loadBusinessInfo();
    return () => controller.abort();
  }, []);

  return (
    <BusinessInfoContext.Provider value={businessInfo}>
      {children}
    </BusinessInfoContext.Provider>
  );
}

export function useBusinessInfo() {
  return useContext(BusinessInfoContext);
}
