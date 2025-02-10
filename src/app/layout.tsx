import type { Metadata } from "next";
import "./globals.css";
import { ModeToggle } from "@/components/mode-toggle";
import { Providers } from "./provider";


export const metadata: Metadata = {
  title: "Makara Phuoy - Full-Stack Developer",
  description: "Portfolio of Makara Phuoy, specializing in full-stack web applications.",
  openGraph: {
    title: "Makara Phuoy - Full-Stack Developer",
    description: "Portfolio of Makara Phuoy, specializing in full-stack web applications.",
    //url: "https://yourwebsite.com",
    images: [
      {
        url: "https://res.cloudinary.com/drosy6q2y/image/upload/v1739154980/photo_2024-07-02_14-55-18_ojc0as.jpg",
        width: 800,
        height: 600,
        alt: "Makara Phuoy's Portfolio Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Makara Phuoy - Full-Stack Developer",
    description: "Portfolio of Makara Phuoy, specializing in full-stack web applications.",
    images: ["https://res.cloudinary.com/drosy6q2y/image/upload/v1739154980/photo_2024-07-02_14-55-18_ojc0as.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        //className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="fixed top-4 right-4 z-50">
              <ModeToggle />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
