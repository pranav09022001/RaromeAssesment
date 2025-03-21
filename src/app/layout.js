
import "./globals.css";


export const metadata = {
  title: "Rarome School project",
  description: "Rarome School project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
