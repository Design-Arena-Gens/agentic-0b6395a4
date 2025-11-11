'use client';

import { useMemo, useState } from "react";
import type { GTMPlan } from "@/lib/agent";

const launchStages = [
  { value: "idea", label: "Idea Validation" },
  { value: "beta", label: "Private/Public Beta" },
  { value: "ga", label: "General Availability" },
];

const primaryGoals = [
  { value: "acquire-users", label: "Acquire Power Users" },
  { value: "generate-revenue", label: "Generate Revenue" },
  { value: "drive-awareness", label: "Drive Awareness" },
];

const pricingStrategies = [
  { value: "freemium", label: "Freemium" },
  { value: "premium", label: "Premium" },
  { value: "usage-based", label: "Usage Based" },
  { value: "one-time", label: "One-time Purchase" },
  { value: "custom", label: "Custom / Enterprise" },
];

const tones = [
  { value: "visionary", label: "Visionary" },
  { value: "pragmatic", label: "Pragmatic" },
  { value: "playful", label: "Playful" },
  { value: "data-driven", label: "Data Driven" },
];

type FormState = {
  productName: string;
  description: string;
  category: string;
  targetAudience: string;
  launchStage: (typeof launchStages)[number]["value"];
  primaryGoal: (typeof primaryGoals)[number]["value"];
  pricingStrategy: (typeof pricingStrategies)[number]["value"];
  tone: (typeof tones)[number]["value"];
  launchDate: string;
  differentiation: string;
  integrations: string;
  founderNotes: string;
};

const defaultState: FormState = {
  productName: "",
  description: "",
  category: "",
  targetAudience: "",
  launchStage: "beta",
  primaryGoal: "acquire-users",
  pricingStrategy: "freemium",
  tone: "visionary",
  launchDate: "",
  differentiation: "",
  integrations: "",
  founderNotes: "",
};

export default function Home() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [plan, setPlan] = useState<GTMPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isReadyToGenerate = useMemo(() => {
    return (
      form.productName.trim() &&
      form.description.trim() &&
      form.category.trim() &&
      form.targetAudience.trim() &&
      form.launchDate.trim() &&
      form.differentiation.trim() &&
      form.integrations.trim()
    );
  }, [form]);

  const handleSubmit = async () => {
    if (!isReadyToGenerate) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Failed to generate plan");
      }

      const data = (await response.json()) as GTMPlan;
      setPlan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setForm(defaultState);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#1d4ed8,transparent_55%)] opacity-70" />
        <header className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-16 pt-20 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
              Agentic GTM Console
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Launch your AI product with a full-funnel go-to-market agent.
            </h1>
            <p className="text-lg text-slate-200">
              Feed the agent with your product context and instantly receive a north-star narrative,
              persona playbooks, channel cadences, and operational metrics that can be executed by
              your founding GTM team.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-200 shadow-xl shadow-blue-900/30">
            <p className="font-medium text-white">Agent Workflow</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Intelligence synthesis across market & buyer signals
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Channel activation schematics ready for execution
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Feedback loops & automation tracks to scale GTM
              </li>
            </ul>
          </div>
        </header>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 lg:px-12">
        <section className="grid gap-8 lg:grid-cols-[360px,1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-blue-900/20">
            <h2 className="text-xl font-semibold text-white">Product Blueprint</h2>
            <p className="mt-2 text-sm text-slate-300">
              Capture the essentials of your AI agent. The GTM agent aligns channel moves, sales
              motions, and automation on top of this context.
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <FormInput
                label="Product Name"
                placeholder="e.g. SignalPilot AI"
                value={form.productName}
                onChange={(value) => setForm((prev) => ({ ...prev, productName: value }))}
              />
              <FormTextArea
                label="Problem + Outcome"
                placeholder="Describe the painful status quo and what your product delivers."
                value={form.description}
                onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
              />
              <FormInput
                label="Category / Space"
                placeholder="AI workflow automation, RevOps intelligence, etc."
                value={form.category}
                onChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
              />
              <FormInput
                label="Target Audience"
                placeholder="Who feels the pain? e.g. GTM leaders at seed-stage startups"
                value={form.targetAudience}
                onChange={(value) => setForm((prev) => ({ ...prev, targetAudience: value }))}
              />
              <FormSelect
                label="Launch Stage"
                value={form.launchStage}
                options={launchStages}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, launchStage: value as FormState["launchStage"] }))
                }
              />
              <FormSelect
                label="Primary Goal"
                value={form.primaryGoal}
                options={primaryGoals}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, primaryGoal: value as FormState["primaryGoal"] }))
                }
              />
              <FormSelect
                label="Pricing Strategy"
                value={form.pricingStrategy}
                options={pricingStrategies}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    pricingStrategy: value as FormState["pricingStrategy"],
                  }))
                }
              />
              <FormSelect
                label="Brand Tone"
                value={form.tone}
                options={tones}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, tone: value as FormState["tone"] }))
                }
              />
              <FormInput
                label="Target Launch Date"
                placeholder="YYYY-MM-DD"
                value={form.launchDate}
                onChange={(value) => setForm((prev) => ({ ...prev, launchDate: value }))}
              />
              <FormTextArea
                label="Signature Differentiation"
                placeholder="What makes you unfairly different?"
                value={form.differentiation}
                onChange={(value) => setForm((prev) => ({ ...prev, differentiation: value }))}
              />
              <FormTextArea
                label="Ecosystem & Integrations"
                placeholder="List the systems, platforms, or data you plug into."
                value={form.integrations}
                onChange={(value) => setForm((prev) => ({ ...prev, integrations: value }))}
              />
              <FormTextArea
                label="Founder Notes"
                placeholder="Any strategic context, proof, or red lines the agent must respect."
                value={form.founderNotes}
                onChange={(value) => setForm((prev) => ({ ...prev, founderNotes: value }))}
              />
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {error ? (
                <Alert variant="error" message={error} />
              ) : (
                <Alert
                  variant="info"
                  message="The agent scans your inputs to craft a GTM playbook ready for execution."
                />
              )}
              <button
                type="button"
                disabled={!isReadyToGenerate || loading}
                onClick={handleSubmit}
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-500 px-6 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 disabled:cursor-not-allowed disabled:bg-blue-500/40"
              >
                {loading ? "Synthesizing GTM plan..." : "Generate GTM System"}
              </button>
              {plan && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 px-6 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800/70"
                >
                  Reset Workspace
                </button>
              )}
            </div>
          </div>
          <div className="space-y-8">
            {!plan && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-slate-200 shadow-lg shadow-blue-900/20">
                <h2 className="text-2xl font-semibold text-white">Operational Cards</h2>
                <p className="mt-3 text-sm text-slate-300">
                  After generation, the agent streams a north-star narrative, persona intelligence,
                  channel strategies, content calendar, launch plays, sales enablement kit, metrics,
                  and automation tracks. It&apos;s the blueprint for your founding GTM pod.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Narrative Engine",
                    "Persona Intelligence",
                    "Channel Sprints",
                    "Content Calendar",
                    "Launch Control",
                    "Sales Enablement",
                    "Metrics Stack",
                    "Automation Track",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-5 text-sm font-medium text-slate-200 shadow-inner shadow-blue-900/20"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {plan && <PlanRenderer plan={plan} founderNotes={form.founderNotes} />}
          </div>
        </section>
      </main>
    </div>
  );
}

function FormInput(props: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2 text-sm text-slate-200">
      <span className="block text-xs uppercase tracking-wider text-slate-400">{props.label}</span>
      <input
        className="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500 focus:bg-slate-900/70"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}

function FormTextArea(props: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2 text-sm text-slate-200">
      <span className="block text-xs uppercase tracking-wider text-slate-400">{props.label}</span>
      <textarea
        className="min-h-[96px] w-full resize-y rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500 focus:bg-slate-900/70"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}

function FormSelect<T extends string>(props: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="space-y-2 text-sm text-slate-200">
      <span className="block text-xs uppercase tracking-wider text-slate-400">{props.label}</span>
      <select
        className="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500 focus:bg-slate-900/70"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value as T)}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-900">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Alert(props: { variant: "info" | "error"; message: string }) {
  const styles =
    props.variant === "info"
      ? "bg-blue-500/15 text-blue-200 border-blue-500/40"
      : "bg-rose-500/10 text-rose-200 border-rose-500/40";
  return (
    <div className={`rounded-xl border px-4 py-3 text-xs font-medium ${styles}`}>
      {props.message}
    </div>
  );
}

function PlanRenderer({ plan, founderNotes }: { plan: GTMPlan; founderNotes: string }) {
  return (
    <div className="space-y-10">
      <PlanCard title="North Star" description={plan.northStar} />
      <PlanCard title="Market Pulse" description={plan.marketSummary} />
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Persona Intelligence</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {plan.personas.map((persona) => (
            <div key={persona.title} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <h4 className="text-base font-semibold text-white">{persona.title}</h4>
              <p className="mt-2 text-sm text-slate-300">{persona.description}</p>
              <TagList title="Pains" items={persona.pains} />
              <TagList title="Triggers" items={persona.triggers} />
              <TagList title="Proof" items={persona.proofPoints} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Value Matrix</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {plan.valueMatrix.map((value) => (
            <div key={value.pillar} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
                {value.pillar}
              </p>
              <p className="mt-2 text-sm text-slate-200">{value.benefit}</p>
              <p className="mt-3 text-xs text-slate-400">{value.message}</p>
              <p className="mt-3 text-xs text-slate-300">Proof: {value.proof}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Channel Operations</h3>
        <div className="mt-4 space-y-5">
          {plan.channelPlan.map((channel) => (
            <div
              key={channel.channel}
              className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 space-y-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base font-semibold text-white">{channel.channel}</p>
                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-100">
                  {channel.objective}
                </span>
              </div>
              <p className="text-sm text-slate-300">{channel.narrative}</p>
              <div className="grid gap-3 md:grid-cols-2">
                <TagList title="Cadence" items={channel.cadences} />
                <TagList title="Signals" items={channel.successSignals} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Content Calendar</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {plan.contentCalendar.map((item) => (
            <div key={`${item.label}-${item.week}`} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{item.label}</span>
                <span>{item.contentType}</span>
              </div>
              <p className="mt-3 text-sm text-slate-200">{item.theme}</p>
              <p className="mt-3 text-xs font-medium text-blue-200">CTA: {item.callToAction}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Launch Plays</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {plan.launchPlaybook.map((play) => (
            <div key={play.phase} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="text-xs uppercase tracking-wide text-blue-200">{play.phase}</div>
              <p className="mt-1 text-sm font-semibold text-white">{play.owner}</p>
              <p className="mt-1 text-xs text-slate-400">{play.timeline}</p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-300">
                {play.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Sales Enablement</h3>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {plan.salesEnablement.map((asset) => (
            <div key={asset.asset} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <p className="text-sm font-semibold text-white">{asset.asset}</p>
              <p className="mt-2 text-xs text-slate-300">{asset.primaryUse}</p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-400">
                {asset.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-blue-200">{asset.deliveryFormat}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Metrics Dashboard</h3>
        <div className="mt-4 space-y-3">
          {plan.metricsDashboard.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="text-base font-semibold text-white">{metric.label}</p>
                <p className="text-xs text-blue-200">{metric.target}</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">{metric.definition}</p>
              <p className="mt-3 text-xs text-slate-400">Instrumentation: {metric.instrumentation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
        <h3 className="text-lg font-semibold text-white">Automation Track</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
          {plan.automationIdeas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
      </div>

      {founderNotes && (
        <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/15 p-6 text-sm text-emerald-100">
          <p className="text-xs uppercase tracking-wide text-emerald-200">Founder Notes</p>
          <p className="mt-2 whitespace-pre-wrap">{founderNotes}</p>
        </div>
      )}
    </div>
  );
}

function PlanCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-blue-900/30">
      <p className="text-xs uppercase tracking-wide text-blue-200">{title}</p>
      <p className="mt-3 text-sm text-slate-200">{description}</p>
    </div>
  );
}

function TagList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-200">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
