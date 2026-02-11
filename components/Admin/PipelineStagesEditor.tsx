"use client";

import { useState } from "react";
import type { PipelineStageRecord, PipelinePipe } from "@/types/lead";
import {
  fetchPipelineStages,
  createPipelineStage,
  updatePipelineStage,
  deletePipelineStage,
  reorderPipelineStages,
} from "@/lib/leads/stages";
import { Loader2, Plus, Pencil, Trash2, GripVertical } from "lucide-react";

interface PipelineStagesEditorProps {
  stages: PipelineStageRecord[];
  onStagesChange: () => void;
}

export function PipelineStagesEditor({
  stages,
  onStagesChange,
}: PipelineStagesEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editPipe, setEditPipe] = useState<PipelinePipe>("mkt");
  const [editMeta, setEditMeta] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newPipe, setNewPipe] = useState<PipelinePipe>("mkt");
  const [newMeta, setNewMeta] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (s: PipelineStageRecord) => {
    setEditingId(s.id);
    setEditLabel(s.label);
    setEditPipe(s.pipe);
    setEditMeta(s.meta_conversion);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    setError(null);
    const { error: err } = await updatePipelineStage(editingId, {
      label: editLabel.trim(),
      pipe: editPipe,
      meta_conversion: editMeta,
    });
    setSaving(false);
    if (err) {
      setError(String(err));
      return;
    }
    setEditingId(null);
    onStagesChange();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta etapa? Leads nela ficarão sem estágio.")) return;
    setSaving(true);
    setError(null);
    const { error: err } = await deletePipelineStage(id);
    setSaving(false);
    if (err) {
      setError(String(err));
      return;
    }
    onStagesChange();
  };

  const handleAdd = async () => {
    const label = newLabel.trim();
    if (!label) return;
    setSaving(true);
    setError(null);
    const maxOrder = stages.length ? Math.max(...stages.map((s) => s.sort_order)) : -1;
    const { error: err } = await createPipelineStage({
      label,
      sort_order: maxOrder + 1,
      pipe: newPipe,
      meta_conversion: newMeta,
    });
    setSaving(false);
    if (err) {
      setError(String(err));
      return;
    }
    setAdding(false);
    setNewLabel("");
    setNewMeta(false);
    setNewPipe("mkt");
    onStagesChange();
  };

  const moveStage = async (index: number, direction: "up" | "down") => {
    const newOrder = [...stages].sort((a, b) => a.sort_order - b.sort_order);
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    setSaving(true);
    setError(null);
    const updates = newOrder.map((s, i) => ({ id: s.id, sort_order: i }));
    const { error: err } = await reorderPipelineStages(updates);
    setSaving(false);
    if (err) {
      setError(String(err));
      return;
    }
    onStagesChange();
  };

  const sorted = [...stages].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="bg-white rounded-xl border border-elite-navy/10 p-6">
      <h2 className="text-xl font-display font-semibold text-elite-navy mb-2">
        Etapas do funil
      </h2>
      <p className="text-sm text-elite-navy/70 mb-4">
        Crie e ordene as etapas. Marque &quot;Conversão Meta&quot; nas etapas em que o lead deve disparar evento para o Meta (ex.: agendou diagnóstico, virou cliente).
      </p>

      {error && (
        <p className="text-sm text-red-600 mb-4 bg-red-50 p-2 rounded">{error}</p>
      )}

      <ul className="space-y-2 mb-6">
        {sorted.map((s, index) => (
          <li
            key={s.id}
            className="flex items-center gap-2 p-3 rounded-lg border border-elite-navy/10 bg-elite-quartz/30"
          >
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveStage(index, "up")}
                disabled={index === 0 || saving}
                className="p-1 rounded hover:bg-elite-navy/10 disabled:opacity-40"
                aria-label="Subir"
              >
                <GripVertical className="w-4 h-4 text-elite-navy/60" />
              </button>
              <button
                type="button"
                onClick={() => moveStage(index, "down")}
                disabled={index === sorted.length - 1 || saving}
                className="p-1 rounded hover:bg-elite-navy/10 disabled:opacity-40"
                aria-label="Descer"
              >
                <GripVertical className="w-4 h-4 text-elite-navy/60" />
              </button>
            </div>

            {editingId === s.id ? (
              <div className="flex-1 flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="flex-1 min-w-[180px] px-3 py-1.5 border border-elite-navy/20 rounded text-sm"
                  placeholder="Nome da etapa"
                />
                <select
                  value={editPipe}
                  onChange={(e) => setEditPipe(e.target.value as PipelinePipe)}
                  className="px-3 py-1.5 border border-elite-navy/20 rounded text-sm bg-white"
                >
                  <option value="mkt">Marketing</option>
                  <option value="sales">Vendas</option>
                </select>
                <label className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    checked={editMeta}
                    onChange={(e) => setEditMeta(e.target.checked)}
                  />
                  Conversão Meta
                </label>
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={saving || !editLabel.trim()}
                  className="px-3 py-1.5 bg-elite-flow text-white rounded text-sm hover:bg-[#009999] disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-3 py-1.5 text-elite-navy/70 rounded text-sm hover:bg-elite-navy/10"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 font-medium text-elite-navy">{s.label}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-elite-navy/10 text-elite-navy/70">
                  {s.pipe === "mkt" ? "Marketing" : "Vendas"}
                </span>
                {s.meta_conversion && (
                  <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                    Conversão Meta
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => startEdit(s)}
                  className="p-1.5 rounded hover:bg-elite-navy/10 text-elite-navy/70"
                  aria-label="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  disabled={saving}
                  className="p-1.5 rounded hover:bg-red-50 text-red-600 disabled:opacity-50"
                  aria-label="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {adding ? (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg border border-elite-flow/30 bg-elite-flow/5">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Nome da nova etapa"
            className="flex-1 min-w-[180px] px-3 py-2 border border-elite-navy/20 rounded text-sm"
          />
          <select
            value={newPipe}
            onChange={(e) => setNewPipe(e.target.value as PipelinePipe)}
            className="px-3 py-2 border border-elite-navy/20 rounded text-sm bg-white"
          >
            <option value="mkt">Marketing</option>
            <option value="sales">Vendas</option>
          </select>
          <label className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={newMeta}
              onChange={(e) => setNewMeta(e.target.checked)}
            />
            Conversão Meta
          </label>
          <button
            type="button"
            onClick={handleAdd}
            disabled={saving || !newLabel.trim()}
            className="px-4 py-2 bg-elite-flow text-white rounded text-sm hover:bg-[#009999] disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Adicionar
          </button>
          <button
            type="button"
            onClick={() => { setAdding(false); setNewLabel(""); }}
            className="px-3 py-2 text-elite-navy/70 rounded text-sm hover:bg-elite-navy/10"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 border border-elite-flow text-elite-flow rounded-lg text-sm font-medium hover:bg-elite-flow/10"
        >
          <Plus className="w-4 h-4" />
          Nova etapa
        </button>
      )}
    </div>
  );
}
