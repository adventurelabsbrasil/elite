"use client";

import { useEffect, useState } from "react";
import type { PipelineStageRecord } from "@/types/lead";
import { fetchPipelineStages } from "@/lib/leads/stages";
import { PipelineStagesEditor } from "./PipelineStagesEditor";

export function EtapasPageContent() {
  const [stages, setStages] = useState<PipelineStageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStages = async () => {
    const { data } = await fetchPipelineStages();
    setStages(data ?? []);
  };

  useEffect(() => {
    loadStages();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-400">
        Carregando...
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-display font-bold text-white mb-6">
        Configuração do funil (Etapas)
      </h2>
      <PipelineStagesEditor stages={stages} onStagesChange={loadStages} />
    </>
  );
}
