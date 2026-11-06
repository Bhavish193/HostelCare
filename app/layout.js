
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
      <body className="min-h-screen bg-[#f3f6fa] font-sans text-ink">
        <AuthProvider>
          <NavBar />

          <main className="min-h-[calc(100vh-190px)]">
            {children}
          </main>

          <footer className="border-t border-white/10 bg-[#101c30] px-5 py-8 text-white">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 sm:flex-row sm:px-8">
              <div>
                <p className="text-lg font-extrabold tracking-tight">
                  Hostel<span className="text-blue-400">Care</span>.
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Better hostels begin with better maintenance.
                </p>
              </div>

              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} HostelCare. Built for better campus living.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
