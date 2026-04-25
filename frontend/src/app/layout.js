
import "@/styles/globals.css";
import "@/styles/variables.css";
import "@/styles/dashboard.css";
import "@/styles/auth.css";
import "@/styles/landing.css";


export const metadata = {
  title: "AI Code Reviewer",
  description:
    "Premium AI Powered Code Review Platform",
};

export default function RootLayout({
  children,
}) {
   
  return (
    <html lang="en">
      
      <body>{children}</body>
    </html>
  );
}