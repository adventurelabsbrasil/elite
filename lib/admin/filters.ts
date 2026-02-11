import type { Lead } from "@/types/lead";

export interface AdminFiltersState {
  dateFrom: string;
  dateTo: string;
  revenue: string;
  source: string;
  medium: string;
  campaign: string;
  stageId: string;
}

export const defaultAdminFilters: AdminFiltersState = {
  dateFrom: "",
  dateTo: "",
  revenue: "all",
  source: "all",
  medium: "all",
  campaign: "all",
  stageId: "all",
};

export function applyAdminFilters(
  leads: Lead[],
  filters: AdminFiltersState
): Lead[] {
  return leads.filter((lead) => {
    if (filters.dateFrom) {
      const d = new Date(lead.created_at).toISOString().slice(0, 10);
      if (d < filters.dateFrom) return false;
    }
    if (filters.dateTo) {
      const d = new Date(lead.created_at).toISOString().slice(0, 10);
      if (d > filters.dateTo) return false;
    }
    if (filters.revenue && filters.revenue !== "all" && lead.revenue_range !== filters.revenue)
      return false;
    if (filters.source && filters.source !== "all" && (lead.source ?? "") !== filters.source)
      return false;
    if (filters.medium && filters.medium !== "all" && (lead.medium ?? "") !== filters.medium)
      return false;
    if (filters.campaign && filters.campaign !== "all" && (lead.campaign ?? "") !== filters.campaign)
      return false;
    if (filters.stageId && filters.stageId !== "all" && (lead.pipeline_stage_id ?? "") !== filters.stageId)
      return false;
    return true;
  });
}
