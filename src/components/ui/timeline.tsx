import * as React from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type TimelineItem = {
  id?: string;
  title: string;
  subtitle?: string;
  meta?: {
    date?: string;
    location?: string;
    type?: string;
    duration?: string;
  };
  description?: string;
  bullets?: string[];
  tags?: string[];
  icon?: React.ReactNode;
  /** Tailwind gradient classes like "from-fuchsia-500 to-blue-500" */
  accent?: string;
};

export type TimelineProps = {
  items: TimelineItem[];
  className?: string;
  /** When provided, enables click-to-play sequential animation. If undefined, uses scroll-driven reveal. */
  play?: boolean;
  /** Per-item delay when playing sequentially */
  stepDelay?: number;
  /** Layout mode: 'alternate' (default) or 'right' (Webflow-like left track with cards on the right) */
  layout?: "alternate" | "right";
};

/**
 * A modern, animated timeline with:
 * - Center line (desktop) / left line (mobile)
 * - Alternating sides on desktop
 * - Smooth in-view animations & connector bars
 * - Keyboard navigation with ArrowUp/ArrowDown
 */
export function Timeline({ items, className, play, stepDelay = 0.2, layout = "alternate" }: TimelineProps) {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.85", "end 0.1"] });

  // For keyboard navigation between cards
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  cardRefs.current = [];
  const setCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const idx = cardRefs.current.findIndex((el) => el === document.activeElement);
    const nextIdx = e.key === "ArrowDown" ? Math.min(idx + 1, cardRefs.current.length - 1) : Math.max(idx - 1, 0);
    const target = cardRefs.current[nextIdx] ?? cardRefs.current[0];
    target?.focus();
  };

  const accents = [
    "from-fuchsia-500 to-pink-500",
    "from-sky-500 to-cyan-400",
    "from-emerald-500 to-lime-400",
    "from-violet-500 to-indigo-500",
  ];

  const scrollDriven = typeof play === "undefined";

  const rightLayout = layout === "right";
  if (rightLayout) {
    return (
      <div ref={sectionRef} className={cn("relative", className)} onKeyDown={onKeyDown}>
        {/* Desktop left line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border" />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={typeof play === "undefined" ? undefined : { scaleY: play ? 1 : 0 }}
          style={typeof play === "undefined" ? { scaleY: scrollYProgress } : undefined}
          className="hidden md:block absolute left-8 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-transparent"
        />

        {/* Mobile left line */}
        <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-border" />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={typeof play === "undefined" ? undefined : { scaleY: play ? 1 : 0 }}
          style={typeof play === "undefined" ? { scaleY: scrollYProgress } : undefined}
          className="md:hidden absolute left-4 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-transparent"
        />

        <div className="space-y-10 md:space-y-14">
          {items.map((it, index) => {
            const accent = it.accent ?? accents[index % accents.length];
            const scrollDriven = typeof play === "undefined";
            return (
              <div key={it.id ?? `${it.title}-${index}`} className="relative">
                {/* Dots */}
                <span className="hidden md:block absolute left-8 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-primary ring-8 ring-background dark:ring-slate-900 shadow-md animate-pulse-slow z-10" />
                <span className="md:hidden absolute left-4 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-primary ring-6 ring-background dark:ring-slate-900 shadow-md z-10" />

                {/* Connector from left track to card */}
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={scrollDriven ? undefined : { width: 56, opacity: play ? 1 : 0 }}
                  whileInView={scrollDriven ? { width: 56, opacity: 1 } : undefined}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: scrollDriven ? index * 0.06 + 0.08 : index * stepDelay + 0.1, ease: "easeOut" }}
                  className={cn("hidden md:block absolute top-6 left-8 h-0.5 bg-gradient-to-r rounded-full", accent)}
                />

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={scrollDriven ? undefined : { opacity: play ? 1 : 0, x: play ? 0 : 40 }}
                  whileInView={scrollDriven ? { opacity: 1, x: 0 } : undefined}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: scrollDriven ? index * 0.06 + 0.14 : index * stepDelay + 0.18, ease: "easeOut" }}
                  className="ml-8 md:ml-28"
                >
                  <Card
                    ref={setCardRef as unknown as React.Ref<HTMLDivElement>}
                    tabIndex={0}
                    className={cn(
                      "relative overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all bg-white/70 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-0.5",
                      "group"
                    )}
                  >
                    {/* Accent strip */}
                    <div className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", accent)} />
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                        {it.meta?.type && <Badge variant="secondary">{it.meta.type}</Badge>}
                        {it.meta?.duration && <Badge variant="outline">{it.meta.duration}</Badge>}
                        {it.meta?.date && <div className="text-muted-foreground">{it.meta.date}</div>}
                        {it.meta?.location && <div className="text-muted-foreground">• {it.meta.location}</div>}
                      </div>

                      <div className="flex items-start gap-3 mb-2">
                        {it.icon && (
                          <div className={cn("mt-1 p-2 rounded-lg bg-gradient-to-br text-white shadow", accent)}>
                            {it.icon}
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold leading-tight">{it.title}</h3>
                          {it.subtitle && (
                            <h4 className="text-base sm:text-lg text-primary font-semibold mt-0.5">{it.subtitle}</h4>
                          )}
                        </div>
                      </div>

                      {it.description && (
                        <p className="hidden md:block text-muted-foreground mb-4 leading-relaxed">{it.description}</p>
                      )}

                      {it.bullets && it.bullets.length > 0 && (
                        <div className="hidden md:block mb-4">
                          <h5 className="font-semibold mb-2 text-sm">Highlights</h5>
                          <ul className="space-y-1">
                            {it.bullets.map((b, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start">
                                <span className={cn("w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 bg-gradient-to-r", accent)} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {(it.description || (it.bullets && it.bullets.length)) && (
                        <details className="md:hidden mb-3">
                          <summary className="cursor-pointer select-none text-sm text-primary">Show details</summary>
                          <div className="mt-2 space-y-3">
                            {it.description && (
                              <p className="text-sm text-muted-foreground">{it.description}</p>
                            )}
                            {it.bullets && it.bullets.length > 0 && (
                              <div>
                                <h5 className="font-semibold mb-1 text-xs">Highlights</h5>
                                <ul className="space-y-1">
                                  {it.bullets.map((b, i) => (
                                    <li key={i} className="text-xs text-muted-foreground flex items-start">
                                      <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 bg-gradient-to-r", accent)} />
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </details>
                      )}

                      {it.tags && it.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {it.tags.map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={cn("relative", className)} onKeyDown={onKeyDown}>
      {/* Center line (md+) with scroll progress */}
      <div className="hidden md:block absolute left-1/2 -ml-px top-0 bottom-0 w-px bg-border" />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={scrollDriven ? undefined : { scaleY: play ? 1 : 0 }}
        style={scrollDriven ? { scaleY: scrollYProgress } : undefined}
        className="hidden md:block absolute left-1/2 -ml-px top-0 bottom-0 w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-transparent"
      />

      {/* Mobile left line with scroll progress */}
      <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-border" />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={scrollDriven ? undefined : { scaleY: play ? 1 : 0 }}
        style={scrollDriven ? { scaleY: scrollYProgress } : undefined}
        className="md:hidden absolute left-4 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-transparent"
      />

      <div className="space-y-10 md:space-y-16">
        {items.map((it, index) => {
          const isLeft = index % 2 === 0;
          const accent = it.accent ?? accents[index % accents.length];
          return (
            <div key={it.id ?? `${it.title}-${index}`} className="relative">
              {/* Dots */}
              <span className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-primary ring-8 ring-background dark:ring-slate-900 shadow-md animate-pulse-slow z-10" />
              <span className="md:hidden absolute left-4 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-primary ring-6 ring-background dark:ring-slate-900 shadow-md z-10" />

              {/* Connector bars */}
              {isLeft ? (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={scrollDriven ? undefined : { width: play ? 48 : 0, opacity: play ? 1 : 0 }}
                  whileInView={scrollDriven ? { width: 48, opacity: 1 } : undefined}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: scrollDriven ? index * 0.05 + 0.1 : index * stepDelay + 0.1, ease: "easeOut" }}
                  className={cn("hidden md:block absolute top-6 right-1/2 h-0.5 bg-gradient-to-l rounded-full", accent)}
                />
              ) : (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={scrollDriven ? undefined : { width: play ? 48 : 0, opacity: play ? 1 : 0 }}
                  whileInView={scrollDriven ? { width: 48, opacity: 1 } : undefined}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: scrollDriven ? index * 0.05 + 0.1 : index * stepDelay + 0.1, ease: "easeOut" }}
                  className={cn("hidden md:block absolute top-6 left-1/2 h-0.5 bg-gradient-to-r rounded-full", accent)}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 items-start">
                {/* Left column */}
                {isLeft ? (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={scrollDriven ? undefined : { opacity: play ? 1 : 0, x: play ? 0 : -50 }}
                    whileInView={scrollDriven ? { opacity: 1, x: 0 } : undefined}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: scrollDriven ? index * 0.05 + 0.12 : index * stepDelay + 0.18, ease: "easeOut" }}
                    className="ml-8 md:ml-0 md:pr-12"
                  >
                    <Card
                      ref={setCardRef as unknown as React.Ref<HTMLDivElement>}
                      tabIndex={0}
                      className={cn(
                        "relative overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all bg-white/70 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-0.5",
                        "group"
                      )}
                    >
                      {/* Accent strip */}
                      <div className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", accent)} />
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                          {it.meta?.type && <Badge variant="secondary">{it.meta.type}</Badge>}
                          {it.meta?.duration && <Badge variant="outline">{it.meta.duration}</Badge>}
                          {it.meta?.date && <div className="text-muted-foreground">{it.meta.date}</div>}
                          {it.meta?.location && <div className="text-muted-foreground">• {it.meta.location}</div>}
                        </div>

                        <div className="flex items-start gap-3 mb-2">
                          {it.icon && (
                            <div className={cn("mt-1 p-2 rounded-lg bg-gradient-to-br text-white shadow", accent)}>
                              {it.icon}
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold leading-tight">{it.title}</h3>
                            {it.subtitle && (
                              <h4 className="text-base sm:text-lg text-primary font-semibold mt-0.5">{it.subtitle}</h4>
                            )}
                          </div>
                        </div>

                        {it.description && (
                          <p className="hidden md:block text-muted-foreground mb-4 leading-relaxed">{it.description}</p>
                        )}

                        {it.bullets && it.bullets.length > 0 && (
                          <div className="hidden md:block mb-4">
                            <h5 className="font-semibold mb-2 text-sm">Highlights</h5>
                            <ul className="space-y-1">
                              {it.bullets.map((b, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start">
                                  <span className={cn("w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 bg-gradient-to-r", accent)} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Mobile collapsible */}
                        {(it.description || (it.bullets && it.bullets.length)) && (
                          <details className="md:hidden mb-3">
                            <summary className="cursor-pointer select-none text-sm text-primary">Show details</summary>
                            <div className="mt-2 space-y-3">
                              {it.description && (
                                <p className="text-sm text-muted-foreground">{it.description}</p>
                              )}
                              {it.bullets && it.bullets.length > 0 && (
                                <div>
                                  <h5 className="font-semibold mb-1 text-xs">Highlights</h5>
                                  <ul className="space-y-1">
                                    {it.bullets.map((b, i) => (
                                      <li key={i} className="text-xs text-muted-foreground flex items-start">
                                        <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 bg-gradient-to-r", accent)} />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </details>
                        )}

                        {it.tags && it.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {it.tags.map((t) => (
                              <Badge key={t} variant="outline" className="text-xs">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* Right column */}
                {!isLeft ? (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={scrollDriven ? undefined : { opacity: play ? 1 : 0, x: play ? 0 : 50 }}
                    whileInView={scrollDriven ? { opacity: 1, x: 0 } : undefined}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: scrollDriven ? index * 0.05 + 0.12 : index * stepDelay + 0.18, ease: "easeOut" }}
                    className="ml-8 md:ml-0 md:pl-12"
                  >
                    <Card
                      ref={setCardRef as unknown as React.Ref<HTMLDivElement>}
                      tabIndex={0}
                      className={cn(
                        "relative overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all bg-white/70 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-0.5",
                        "group"
                      )}
                    >
                      {/* Accent strip */}
                      <div className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", accent)} />
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                          {it.meta?.type && <Badge variant="secondary">{it.meta.type}</Badge>}
                          {it.meta?.duration && <Badge variant="outline">{it.meta.duration}</Badge>}
                          {it.meta?.date && <div className="text-muted-foreground">{it.meta.date}</div>}
                          {it.meta?.location && <div className="text-muted-foreground">• {it.meta.location}</div>}
                        </div>

                        <div className="flex items-start gap-3 mb-2">
                          {it.icon && (
                            <div className={cn("mt-1 p-2 rounded-lg bg-gradient-to-br text-white shadow", accent)}>
                              {it.icon}
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold leading-tight">{it.title}</h3>
                            {it.subtitle && (
                              <h4 className="text-base sm:text-lg text-primary font-semibold mt-0.5">{it.subtitle}</h4>
                            )}
                          </div>
                        </div>

                        {it.description && (
                          <p className="hidden md:block text-muted-foreground mb-4 leading-relaxed">{it.description}</p>
                        )}

                        {it.bullets && it.bullets.length > 0 && (
                          <div className="hidden md:block mb-4">
                            <h5 className="font-semibold mb-2 text-sm">Highlights</h5>
                            <ul className="space-y-1">
                              {it.bullets.map((b, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start">
                                  <span className={cn("w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 bg-gradient-to-r", accent)} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Mobile collapsible */}
                        {(it.description || (it.bullets && it.bullets.length)) && (
                          <details className="md:hidden mb-3">
                            <summary className="cursor-pointer select-none text-sm text-primary">Show details</summary>
                            <div className="mt-2 space-y-3">
                              {it.description && (
                                <p className="text-sm text-muted-foreground">{it.description}</p>
                              )}
                              {it.bullets && it.bullets.length > 0 && (
                                <div>
                                  <h5 className="font-semibold mb-1 text-xs">Highlights</h5>
                                  <ul className="space-y-1">
                                    {it.bullets.map((b, i) => (
                                      <li key={i} className="text-xs text-muted-foreground flex items-start">
                                        <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0 bg-gradient-to-r", accent)} />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </details>
                        )}

                        {it.tags && it.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {it.tags.map((t) => (
                              <Badge key={t} variant="outline" className="text-xs">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
