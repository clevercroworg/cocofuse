
import { Poppins, Nunito, Pacifico } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import localFont from "next/font/local";
import { FlavorProvider } from "@/context/FlavorContext";
import SubscribePopup from "@/components/SubscribePopup";
import Script from "next/script";

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const headingFont = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-heading",
});

const scriptFont = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const wedgesFont = localFont({
  src: "../../public/wedges.regular.ttf",
  variable: "--font-wedges",
  weight: "400",
  style: "normal",
});

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "CocoFuse. | Fun, Clean Fuel for Real Life",
  description: "Flavoured coconut water with zero nonsense. The anti-soda. The anti-sugar. The anti-boring.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${scriptFont.variable} ${wedgesFont.variable} font-body antialiased bg-primary-white text-accent-premium custom-cursor`}
      >
        {/* Google Analytics (gtag.js) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        <FlavorProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
          <SubscribePopup />
        </FlavorProvider>
      </body>
    </html>
  );
}
