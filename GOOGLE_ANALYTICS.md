# Google Analytics 4 Integration

Google Analytics 4 has been successfully integrated into your Next.js app.

## Setup Complete ✅

### 1. Package Installed
- `@next/third-parties` - Official Next.js library for third-party integrations

### 2. Environment Variable Added
```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```
**Action Required**: Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID from [Google Analytics](https://analytics.google.com/)

### 3. Integration in Layout
- GoogleAnalytics component added to `app/layout.tsx`
- Only loads when `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set
- Automatically tracks page views

### 4. Purchase Tracking Component Created
- `components/analytics/track-purchase.tsx`
- Tracks e-commerce purchase events

## How to Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Go to **Admin** → **Data Streams**
4. Click on your web stream
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
6. Add it to your `.env.local` file

## Usage Examples

### Automatic Page View Tracking
Page views are tracked automatically once GA4 is configured. No additional code needed!

### Track Purchase Events
Use the `TrackPurchase` component on your order success page:

```tsx
// app/checkout/success/page.tsx
import { TrackPurchase } from "@/components/analytics/track-purchase";

export default function OrderSuccessPage() {
  // Get order data from your database or URL params
  const order = {
    orderId: "ZA-20260127-0001",
    value: 1299.99,
    currency: "INR",
    items: [
      {
        id: "prod_123",
        name: "Custom Lithophane Lamp",
        quantity: 1,
        price: 1299.99,
      },
    ],
  };

  return (
    <div>
      <TrackPurchase
        orderId={order.orderId}
        value={order.value}
        currency={order.currency}
        items={order.items}
      />
      
      <h1>Order Successful!</h1>
      {/* Rest of your success page */}
    </div>
  );
}
```

### Track Custom Events
You can also track custom events using the `gtag` function:

```tsx
"use client";

import { useEffect } from "react";

export function CustomEventExample() {
  const trackCustomEvent = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "custom_project_submitted", {
        event_category: "engagement",
        event_label: "Custom Project Form",
        value: 1,
      });
    }
  };

  return (
    <button onClick={trackCustomEvent}>
      Submit Custom Project
    </button>
  );
}
```

## What Gets Tracked

### Automatically Tracked
- ✅ Page views
- ✅ Session duration
- ✅ User demographics
- ✅ Traffic sources
- ✅ Device information

### Manually Tracked (when implemented)
- 🛒 E-commerce purchases
- 📝 Form submissions
- 🔗 Outbound link clicks
- 📥 File downloads
- 🎯 Custom events

## Privacy & GDPR Compliance

The Google Analytics integration:
- Only loads when the environment variable is set
- Uses the official Next.js third-party library (optimized for performance)
- Respects user privacy settings
- Can be disabled by removing the environment variable

**Note**: For GDPR compliance, consider adding a cookie consent banner before loading analytics.

## Testing

### Development
1. Add your GA4 Measurement ID to `.env.local`
2. Run `npm run dev`
3. Visit your site
4. Check the browser console for tracking logs
5. View real-time data in Google Analytics

### Production
1. Add `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` to your Vercel environment variables
2. Deploy your app
3. Monitor analytics in your GA4 dashboard

## Performance

The `@next/third-parties` library:
- ✅ Loads Google Analytics asynchronously
- ✅ Doesn't block page rendering
- ✅ Optimized for Core Web Vitals
- ✅ Automatically handles script loading

Your analytics are now tracking! 📊
