import { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  id,
  align = "left",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <div className="container-pad">
        {(eyebrow || title || description) && (
          <Reveal direction="up">
            <div className={`max-w-2xl mb-10 sm:mb-14 ${isCenter ? "mx-auto text-center" : ""}`}>
              {eyebrow && <div className="label mb-3">{eyebrow}</div>}
              {title && <h2 className="h-section text-balance">{title}</h2>}
              {description && <p className="mt-3 lede text-pretty">{description}</p>}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
