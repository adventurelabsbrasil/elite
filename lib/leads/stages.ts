import { createClient } from "@/lib/supabase/client";
import type { PipelineStageRecord, PipelinePipe } from "@/types/lead";

export async function fetchPipelineStages(): Promise<{
  data: PipelineStageRecord[];
  error: unknown;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("elite")
    .from("pipeline_stages")
    .select("id, label, sort_order, pipe, meta_conversion, created_at")
    .order("sort_order", { ascending: true });

  return { data: (data ?? []) as PipelineStageRecord[], error: error ?? null };
}

export async function createPipelineStage(stage: {
  label: string;
  sort_order: number;
  pipe: PipelinePipe;
  meta_conversion: boolean;
}): Promise<{ data: PipelineStageRecord | null; error: unknown }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("elite")
    .from("pipeline_stages")
    .insert(stage)
    .select("id, label, sort_order, pipe, meta_conversion, created_at")
    .single();

  return { data: data as PipelineStageRecord | null, error: error ?? null };
}

export async function updatePipelineStage(
  id: string,
  updates: Partial<{
    label: string;
    sort_order: number;
    pipe: PipelinePipe;
    meta_conversion: boolean;
  }>
): Promise<{ error: unknown }> {
  const supabase = createClient();
  const { error } = await supabase
    .schema("elite")
    .from("pipeline_stages")
    .update(updates)
    .eq("id", id);

  return { error: error ?? null };
}

export async function deletePipelineStage(id: string): Promise<{ error: unknown }> {
  const supabase = createClient();
  const { error } = await supabase
    .schema("elite")
    .from("pipeline_stages")
    .delete()
    .eq("id", id);

  return { error: error ?? null };
}

export async function reorderPipelineStages(
  updates: { id: string; sort_order: number }[]
): Promise<{ error: unknown }> {
  const supabase = createClient();
  for (const { id, sort_order } of updates) {
    const { error } = await supabase
      .schema("elite")
      .from("pipeline_stages")
      .update({ sort_order })
      .eq("id", id);
    if (error) return { error };
  }
  return { error: null };
}
