import "./globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/components/AuthContext";

export const metadata = {
  title: "HostelCare | Hostel Maintenance",
  description: "Report and track hostel maintenance complaints.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas font-sans text-ink">
        <AuthProvider>
          <NavBar />
          <main className="min-h-[calc(100vh-150px)]">{children}</main>
          <footer className="border-t border-line bg-white px-5 py-7 text-center text-sm text-muted">
            HostelCare <span className="text-primary">·</span> Making hostel maintenance simpler.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
