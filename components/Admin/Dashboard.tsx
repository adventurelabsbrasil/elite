"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lead, REVENUE_RANGES, JOB_LEVELS } from "@/types/lead";
import { LeadsTable } from "./LeadsTable";
import { Charts } from "./Charts";
import { LogOut, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .schema("elite")
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Erro ao carregar leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const exportToCSV = () => {
    const getRevenueLabel = (v: string) => REVENUE_RANGES.find((r) => r.value === v)?.label || v;
    const getCargoLabel = (v: string | null | undefined) => (v ? JOB_LEVELS.find((j) => j.value === v)?.label || v : "-");
    const headers = ["Nome", "Email", "WhatsApp", "Cargo", "Faturamento", "Origem", "Data"];
    const rows = leads.map((lead) => [
      lead.nome,
      lead.email,
      lead.whatsapp,
      getCargoLabel(lead.cargo),
      getRevenueLabel(lead.revenue_range),
      lead.source || "-",
      new Date(lead.created_at).toLocaleDateString("pt-BR"),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-elite-quartz">
      <header className="bg-white border-b border-elite-navy/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold text-elite-navy">
              Dashboard - Leads ELITE
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-elite-flow hover:bg-[#009999] text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-elite-navy hover:bg-elite-quartz rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-elite-navy/70">Carregando...</p>
          </div>
        ) : (
          <>
            <Charts leads={leads} />
            <div className="mt-8">
              <LeadsTable leads={leads} onRefresh={loadLeads} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
