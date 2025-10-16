import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/auth-context";
export const metadata: Metadata = {
  title: "Artisan Barber Academy",
  description: "Learn barbering skills from beginner to advanced",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
        <Navigation />
        <main> {children}</main>
        <Footer />
        </AuthProvider>
      </body>
      
    </html>
  );
}
