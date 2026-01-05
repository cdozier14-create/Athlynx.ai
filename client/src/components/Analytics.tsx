import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 Measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function initializeAnalytics() {
  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle page views manually
  });
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

// Custom event tracking functions
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value || 0,
    currency: 'USD',
  });
};

// VIP Signup tracking
export const trackVIPSignup = (userData: {
  role: string;
  sport: string;
  email: string;
}) => {
  trackConversion('vip_signup', 29); // $29 monthly value
  trackEvent('sign_up', {
    method: 'vip_form',
    role: userData.role,
    sport: userData.sport,
  });
};

// Access Code tracking
export const trackAccessCodeEntry = (success: boolean) => {
  trackEvent('access_code_entry', {
    success: success,
  });
  if (success) {
    trackConversion('access_code_success', 0);
  }
};

// App Preview tracking
export const trackAppPreview = (appName: string) => {
  trackEvent('app_preview', {
    app_name: appName,
  });
};

// Portal Login tracking
export const trackPortalLogin = (userType: string) => {
  trackEvent('login', {
    method: 'portal',
    user_type: userType,
  });
};

// Founder Interest tracking
export const trackFounderInterest = () => {
  trackConversion('founder_interest', 100); // High-value conversion
  trackEvent('founder_click', {
    source: 'header_button',
  });
};

// NIL Deal tracking
export const trackNILDeal = (dealValue: number, brandName: string) => {
  trackConversion('nil_deal', dealValue * 0.15); // 15% commission
  trackEvent('nil_deal_completed', {
    deal_value: dealValue,
    brand: brandName,
    commission: dealValue * 0.15,
  });
};

// Subscription tracking
export const trackSubscription = (plan: string, amount: number) => {
  trackConversion('subscription', amount);
  trackEvent('purchase', {
    transaction_id: `SUB-${Date.now()}`,
    value: amount,
    currency: 'USD',
    items: [
      {
        item_id: plan,
        item_name: `ATHLYNX ${plan} Plan`,
        price: amount,
        quantity: 1,
      },
    ],
  });
};

// Engagement tracking
export const trackEngagement = (action: string, label?: string) => {
  trackEvent('engagement', {
    engagement_type: action,
    engagement_label: label,
  });
};

export default Analytics;
