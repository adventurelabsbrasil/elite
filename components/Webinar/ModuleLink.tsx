import Link from "next/link";
import { ChevronRight } from "lucide-react";

type ModuleLinkProps = {
  href: string;
  title: string;
  description: string;
};

export function ModuleLink({ href, title, description }: ModuleLinkProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-elite-flow/20 bg-elite-navy/50 p-5 sm:p-6 transition-all hover:border-elite-flow/50 hover:bg-elite-navy/80 focus:outline-none focus:ring-2 focus:ring-elite-flow/50 focus:ring-offset-2 focus:ring-offset-elite-navy"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-elite-quartz group-hover:text-elite-flow transition-colors">
            {title}
          </h2>
          <p className="mt-1 text-sm text-elite-quartz/80">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-elite-flow/70 shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
