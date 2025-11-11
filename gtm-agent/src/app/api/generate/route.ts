import { NextResponse } from "next/server";
import { generateGTMPlan, type GTMInput } from "@/lib/agent";

const REQUIRED_FIELDS: (keyof GTMInput)[] = [
  "productName",
  "description",
  "category",
  "targetAudience",
  "launchStage",
  "primaryGoal",
  "pricingStrategy",
  "tone",
  "launchDate",
  "differentiation",
  "integrations",
  "founderNotes",
];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<GTMInput>;

    for (const field of REQUIRED_FIELDS) {
      if (!payload[field] || (typeof payload[field] === "string" && !payload[field]?.trim())) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const plan = generateGTMPlan(payload as GTMInput);

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Failed to generate GTM plan", error);
    return NextResponse.json(
      { error: "Failed to generate GTM plan. Please try again." },
      { status: 500 }
    );
  }
}
