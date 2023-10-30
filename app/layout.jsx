import "@/styles/globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ background: "#fefcf3" }} suppressHydrationWarning>
      <head />
      <body className={clsx("min-h-screen font-sans antialiased bg-haze-100")}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <span className="flex items-center gap-1 text-current">
                <span className="text-default-600">Powered by Co:Helm</span>
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
