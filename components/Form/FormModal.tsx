"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QualificationForm } from "./QualificationForm";

type FormModalContextValue = {
  openForm: () => void;
};

const FormModalContext = React.createContext<FormModalContextValue | null>(null);

export function useFormModal() {
  const ctx = React.useContext(FormModalContext);
  if (!ctx) return { openForm: () => {} };
  return ctx;
}

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const openForm = React.useCallback(() => setOpen(true), []);
  const value = React.useMemo(() => ({ openForm }), [openForm]);

  return (
    <FormModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showClose className="max-w-2xl" aria-labelledby="form-modal-title">
          <DialogHeader>
            <DialogTitle id="form-modal-title">Garanta sua vaga GRATUITA no método ELITE</DialogTitle>
          </DialogHeader>
          <QualificationForm />
        </DialogContent>
      </Dialog>
    </FormModalContext.Provider>
  );
}
