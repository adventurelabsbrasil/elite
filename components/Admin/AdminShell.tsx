"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, LayoutGrid, Table, Settings, ArrowLeft, Thermometer, BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/crm", label: "CRM", icon: LayoutGrid },
  { href: "/admin/leads", label: "Tabela de leads", icon: Table },
  { href: "/admin/etapas", label: "Etapas do funil", icon: Settings },
  { href: "/admin/heatmap", label: "Mapa de calor", icon: Thermometer },
  { href: "/admin/relatorios", label: "Relatórios", icon: BarChart3 },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname === "/admin" || pathname === "/admin/";
  const showBack = !isDashboard;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 dark">
      <header className="border-b border-gray-700 bg-gray-800/80 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {showBack && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao Dashboard
                </Link>
              )}
              <h1 className="text-xl font-display font-bold text-white">
                ELITE Admin
              </h1>
            </div>
            <nav className="flex flex-wrap items-center gap-1">
              {nav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href !== "/admin" && pathname?.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-elite-flow text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white ml-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
