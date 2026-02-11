"use client";

import { useMemo } from "react";
import { Lead, type PipelineStageRecord } from "@/types/lead";
import { Loader2 } from "lucide-react";

interface LeadsPipelineProps {
  leads: Lead[];
  stages: PipelineStageRecord[];
  onRefresh: () => void;
  onStageChange: (leadId: string, stageId: string) => Promise<void>;
  updatingLeadId?: string | null;
}

const DEFAULT_STAGE_ID = "00000000-0000-4000-8000-000000000001";

function getStageId(lead: Lead): string | null {
  return lead.pipeline_stage_id ?? null;
}

export function LeadsPipeline({
  leads,
  stages,
  onStageChange,
  updatingLeadId,
}: LeadsPipelineProps) {
  const sortedStages = useMemo(
    () => [...stages].sort((a, b) => a.sort_order - b.sort_order),
    [stages]
  );

  const mktStages = sortedStages.filter((s) => s.pipe === "mkt");
  const salesStages = sortedStages.filter((s) => s.pipe === "sales");

  const byStage = useMemo(() => {
    const map: Record<string, Lead[]> = {};
    sortedStages.forEach((s) => (map[s.id] = []));
    map[""] = []; // sem estágio
    leads.forEach((lead) => {
      const sid = getStageId(lead);
      const key = sid ?? "";
      if (!map[key]) map[key] = [];
      map[key].push(lead);
    });
    return map;
  }, [leads, sortedStages]);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    if (!leadId) return;
    onStageChange(leadId, stageId);
  };

  const renderColumn = (stage: PipelineStageRecord) => {
    const leadList = byStage[stage.id] ?? [];
    return (
      <div
        key={stage.id}
        className="w-72 flex-shrink-0 rounded-xl border border-elite-navy/10 bg-white/80 p-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, stage.id)}
      >
        <h3 className="text-sm font-semibold text-elite-navy mb-3 flex items-center justify-between">
          <span>{stage.label}</span>
          <span className="text-elite-navy/60 font-normal">{leadList.length}</span>
        </h3>
        <div className="space-y-2 min-h-[120px]">
          {leadList.map((lead) => (
            <div
              key={lead.id}
              draggable
              onDragStart={(e) => handleDragStart(e, lead.id)}
              className="rounded-lg border border-elite-navy/10 bg-white p-3 shadow-sm cursor-grab active:cursor-grabbing hover:border-elite-flow/30 transition-colors"
            >
              {updatingLeadId === lead.id ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-elite-flow" />
                </div>
              ) : (
                <>
                  <p className="font-medium text-elite-navy truncate">{lead.nome}</p>
                  <p className="text-xs text-elite-navy/70 truncate mt-0.5">{lead.email}</p>
                  {lead.tags && lead.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {lead.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-elite-quartz text-elite-navy/80"
                        >
                          {tag}
                        </span>
                      ))}
                      {lead.tags.length > 3 && (
                        <span className="text-[10px] text-elite-navy/50">
                          +{lead.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (stages.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-elite-navy/10 p-8 text-center text-elite-navy/70">
        Nenhuma etapa do funil. Vá em <strong>Etapas</strong> e crie as etapas.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max items-start">
        {mktStages.length > 0 && (
          <>
            <div className="flex-shrink-0 w-28 flex items-center justify-center pt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-elite-flow whitespace-nowrap">
                Funil Marketing
              </span>
            </div>
            {mktStages.map(renderColumn)}
          </>
        )}
        {mktStages.length > 0 && salesStages.length > 0 && (
          <div className="flex-shrink-0 w-px self-stretch bg-elite-navy/20 mx-1" aria-hidden />
        )}
        {salesStages.length > 0 && (
          <>
            <div className="flex-shrink-0 w-28 flex items-center justify-center pt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-elite-navy/70 whitespace-nowrap">
                Funil Vendas
              </span>
            </div>
            {salesStages.map(renderColumn)}
          </>
        )}
      </div>
    </div>
  );
}
