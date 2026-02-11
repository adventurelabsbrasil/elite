import { createClient } from "@/lib/supabase/client";

export async function updateLeadStage(
  leadId: string,
  pipeline_stage_id: string | null
): Promise<{ error: unknown }> {
  const supabase = createClient();
  const { error } = await supabase
    .schema("elite")
    .from("leads")
    .update({ pipeline_stage_id: pipeline_stage_id || null })
    .eq("id", leadId);

  return { error: error ?? null };
}

export async function updateLeadTags(
  leadId: string,
  tags: string[]
): Promise<{ error: unknown }> {
  const supabase = createClient();
  const { error } = await supabase
    .schema("elite")
    .from("leads")
    .update({ tags })
    .eq("id", leadId);

  return { error: error ?? null };
}
