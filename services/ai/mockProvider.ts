/**
 * DAILY AI - LOCAL INTELLIGENCE PROVIDER (always free)
 *
 * This provider never leaves the machine and never costs anything. It is the
 * guaranteed fallback whenever a remote provider is unavailable, rate-limited
 * or fails, which is what keeps DAILY AI's free-first promise intact.
 *
 * It is intentionally richer than a stub: it recognises the everyday shapes of
 * real requests and returns a genuinely useful, structured plan.
 */

import { AnalysisContext, StructuredRequirement } from "@/types/request";
import { AIProvider } from "./provider";
import { normalizeRequirement } from "./normalizer";

interface MockPlan {
  category: StructuredRequirement["category"];
  summary: string;
  requirements: { label: string; value: string }[];
  budgetEstimate: string;
  timelineEstimate: string;
  missing: { label: string; value: string }[];
  suggested: string[];
  fulfillmentMethod: StructuredRequirement["fulfillmentMethod"];
  nextAction: string;
  confidence: number;
  routes: StructuredRequirement["fulfillmentRoutes"];
  recommendedRouteId: string;
}

function hasAny(haystack: string, needles: string[]): boolean {
  return needles.some((needle) => haystack.includes(needle));
}

function clip(text: string, length = 110): string {
  const trimmed = text.trim().replace(/\s+/g, " ");
  return trimmed.length > length ? `${trimmed.slice(0, length - 1).trimEnd()}\u2026` : trimmed;
}

function buildPlans(prompt: string, context?: AnalysisContext): MockPlan[] {
  const lower = prompt.toLowerCase();
  const hasHistory = (context?.turns ?? []).length > 0;

  const plans: MockPlan[] = [];

  if (
    hasAny(lower, ["website", "web site", "landing page", "web page", "portfolio site", "e-commerce", "ecommerce site", "online store"]) ||
    hasAny(lower, ["site for my", "site for a"])
  ) {
    plans.push({
      category: "Digital & Technology",
      summary:
        "A fast, credible website for the business, built and shipped end to end.",
      requirements: [
        { label: "Deliverable", value: "Responsive marketing website, 5 core pages" },
        { label: "Stack", value: "Next.js, Tailwind, statically deployed" },
        { label: "Must include", value: "WhatsApp ordering, contact form, basic SEO" },
        { label: "Audience", value: "Local customers searching on mobile" },
      ],
      budgetEstimate: "15,000 - 25,000",
      timelineEstimate: "5 - 7 days",
      missing: [
        { label: "Existing brand assets (logo, colours, copy)", value: "" },
        { label: "Domain and hosting ownership", value: "" },
        { label: "Content you want written vs. content you supply", value: "" },
      ],
      suggested: [
        "Do you already have a domain, or should we register one?",
        "Should the site be able to take payments, or only enquiries?",
        "Do you have reference sites whose look you like?",
      ],
      fulfillmentMethod: "ai_direct",
      nextAction:
        "Confirm your brand assets and page list, then DAILY AI builds and deploys the first version.",
      confidence: 94,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Build Studio",
          description:
            "Generated, reviewed by an engineer, and deployed with analytics and SEO wired in.",
          type: "direct",
          estimatedPrice: "18,500 - 22,000",
          estimatedTimeline: "5 days",
          confidence: 96,
          pros: ["Fastest path to a live site", "Included maintenance window"],
          cons: ["Custom back-office systems land in a second phase"],
        },
        {
          id: "route-2",
          title: "Vetted Web Engineer",
          description:
            "Matched with a senior engineer for bespoke motion and integrations.",
          type: "marketplace_match",
          estimatedPrice: "24,000 - 40,000",
          estimatedTimeline: "8 - 10 days",
          confidence: 88,
          pros: ["Deep customisation", "Direct collaboration"],
          cons: ["Longer calendar, higher spend"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (
    hasAny(lower, ["photographer", "photography", "videographer", "video shoot", "candid", "photoshoot", "event shoot", "wedding photo"]) ||
    (hasAny(lower, ["shoot", "photograph"]) && hasAny(lower, ["saturday", "event", "wedding", "birthday", "premiere"]))
  ) {
    plans.push({
      category: "Local Services",
      summary:
        "A photographer confirmed, briefed and booked for the date that matters.",
      requirements: [
        { label: "Coverage", value: "3 - 4 hours, candid + posed" },
        { label: "Location", value: "City and venue to be confirmed" },
        { label: "Deliverables", value: "200+ edited images, online gallery, social cut-downs" },
        { label: "Date", value: "This weekend - date not yet confirmed" },
      ],
      budgetEstimate: "8,000 - 18,000",
      timelineEstimate: "24 - 48 hours to confirm",
      missing: [
        { label: "Exact date, time and venue", value: "" },
        { label: "Number of people to be covered", value: "" },
        { label: "Must-have shots or reference styles", value: "" },
      ],
      suggested: [
        "What is the exact date, start time and venue?",
        "Roughly how many people should be in the photos?",
        "Do you prefer documentary candids or posed portraits?",
      ],
      fulfillmentMethod: "provider_match",
      nextAction:
        "DAILY AI checks availability for three matched photographers and holds the best slot.",
      confidence: 91,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Verified Photographer",
          description:
            "Availability checked, portfolio reviewed against your brief, booking locked.",
          type: "marketplace_match",
          estimatedPrice: "9,000 - 12,000",
          estimatedTimeline: "2 days",
          confidence: 93,
          pros: ["Vetted portfolios", "Backup photographer included"],
          cons: ["Styles vary slightly between matches"],
        },
        {
          id: "route-2",
          title: "Top-Rated Local Match",
          description:
            "A single hand-picked creator based on style and past client reviews.",
          type: "marketplace_match",
          estimatedPrice: "12,000 - 18,000",
          estimatedTimeline: "1 day",
          confidence: 87,
          pros: ["Exact style control", "Premium retouching"],
          cons: ["Highest cost of the three"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (
    hasAny(lower, ["compare", "cheapest", "lowest price", "best price", "quotes", "price comparison", "vs ", "versus"]) ||
    (hasAny(lower, ["price"]) && hasAny(lower, ["compare", "options", "alternatives", "different"]))
  ) {
    plans.push({
      category: "Procurement",
      summary:
        "A like-for-like price comparison across real suppliers, normalised to one table.",
      requirements: [
        { label: "Item", value: clip(prompt, 70) },
        { label: "Quantity", value: "Not stated - drives the price break" },
        { label: "Comparison basis", value: "Unit price, lead time, MOQ and landed cost" },
        { label: "Market", value: "India - domestic supply" },
      ],
      budgetEstimate: "To be estimated",
      timelineEstimate: "24 - 48 hours for quotes",
      missing: [
        { label: "Quantity required", value: "" },
        { label: "Quality or specification grade", value: "" },
        { label: "Delivery deadline and destination", value: "" },
      ],
      suggested: [
        "How many units do you need, and by when?",
        "Is there a specification or grade we must match?",
        "Should we include shipping in the comparison or compare ex-factory?",
      ],
      fulfillmentMethod: "compare_options",
      nextAction:
        "DAILY AI broadcasts the requirement to matched suppliers and returns a normalised comparison.",
      confidence: 89,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Quote Benchmark",
          description:
            "One request, multiple suppliers, normalised into a single comparable table.",
          type: "direct",
          estimatedPrice: "No platform fee - you pay the winning quote",
          estimatedTimeline: "48 hours",
          confidence: 94,
          pros: ["Apples-to-apples comparison", "No brokerage"],
          cons: ["Suppliers respond within the quote window"],
        },
        {
          id: "route-2",
          title: "Human Procurement Desk",
          description:
            "A specialist negotiates on your behalf and validates supplier credentials.",
          type: "human_review",
          estimatedPrice: "Negotiated quote",
          estimatedTimeline: "3 - 5 days",
          confidence: 82,
          pros: ["Supplier vetting", "Better final terms"],
          cons: ["Slower", "Requires a signed engagement"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (
    hasAny(lower, ["presentation", "pitch deck", "slide", "ppt", "deck", "keynote", "investor deck"]) ||
    (hasAny(lower, ["slides"]) && hasAny(lower, ["make", "create", "build", "need"]))
  ) {
    plans.push({
      category: "Creative",
      summary:
        "A presentation deck built from your material, structured to land with the room.",
      requirements: [
        { label: "Deliverable", value: "12 - 15 slide deck with speaker notes" },
        { label: "Audience", value: "Not stated - drives tone and depth" },
        { label: "Source material", value: "Raw notes or data you will supply" },
        { label: "Format", value: "Editable deck plus an exported PDF" },
      ],
      budgetEstimate: "4,000 - 12,000",
      timelineEstimate: "2 - 3 days",
      missing: [
        { label: "Who is the audience", value: "" },
        { label: "Source material and key message", value: "" },
        { label: "Brand template or start from scratch", value: "" },
      ],
      suggested: [
        "Who is this deck for, and what should they do after seeing it?",
        "Do you have existing slides to refine, or are we starting from a blank page?",
        "Should we build it in your brand colours and fonts?",
      ],
      fulfillmentMethod: "ai_direct",
      nextAction:
        "DAILY AI drafts the narrative arc and first version of the deck for your review.",
      confidence: 90,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Deck Studio",
          description:
            "Narrative, copy and layout drafted and exported in one pass.",
          type: "direct",
          estimatedPrice: "4,000 - 8,000",
          estimatedTimeline: "2 days",
          confidence: 93,
          pros: ["Fast turnaround", "Fully editable output"],
          cons: ["Two revision rounds included"],
        },
        {
          id: "route-2",
          title: "Presentation Designer",
          description:
            "A senior designer builds the deck with high visual polish.",
          type: "marketplace_match",
          estimatedPrice: "9,000 - 12,000",
          estimatedTimeline: "4 days",
          confidence: 86,
          pros: ["Premium visual design", "Unlimited revisions"],
          cons: ["Longer calendar"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (
    hasAny(lower, ["find a product", "find me a product", "buy a", "purchase a", "source a", "order "]) ||
    (hasAny(lower, ["product"]) && hasAny(lower, ["find", "need", "looking for", "recommend"]))
  ) {
    plans.push({
      category: "Procurement",
      summary:
        "A shortlist of products that actually fit, with the trade-offs made explicit.",
      requirements: [
        { label: "Item", value: clip(prompt, 70) },
        { label: "Use case", value: "Everyday use - volume unknown" },
        { label: "Shortlist size", value: "3 options, ranked" },
        { label: "Purchase", value: "Direct purchase or referral to the seller" },
      ],
      budgetEstimate: "To be estimated",
      timelineEstimate: "Same day shortlist",
      missing: [
        { label: "Budget per unit", value: "" },
        { label: "Must-have specifications", value: "" },
        { label: "Where it needs to be delivered", value: "" },
      ],
      suggested: [
        "What is your realistic budget for one unit?",
        "Are there specifications we cannot compromise on?",
        "Do you want to buy directly, or just be pointed to the best seller?",
      ],
      fulfillmentMethod: "compare_options",
      nextAction:
        "DAILY AI returns three ranked options with price, availability and the reason to pick each.",
      confidence: 85,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Product Match",
          description:
            "Ranked shortlist with live pricing and availability, ordered for you if you want it.",
          type: "direct",
          estimatedPrice: "Product cost only",
          estimatedTimeline: "Same day",
          confidence: 89,
          pros: ["Ranked, not just listed", "Purchase handled end to end"],
          cons: ["Catalogue coverage is not unlimited"],
        },
        {
          id: "route-2",
          title: "Specialist Sourcing Desk",
          description:
            "A human specialist hunts niche or hard-to-source items.",
          type: "human_review",
          estimatedPrice: "From 2,000 sourcing fee",
          estimatedTimeline: "3 - 5 days",
          confidence: 84,
          pros: ["Reaches rare suppliers", "Inspects samples"],
          cons: ["Adds a sourcing fee to the product cost"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (
    hasAny(lower, ["automate", "automation", "automatically", "workflow", "no one has to", "manual process"]) ||
    (hasAny(lower, ["invoice", "reconcile", "follow up", "onboard", "data entry", "report every"]) && hasAny(lower, ["automate", "automatically", "repeat", "every", "manual"]))
  ) {
    plans.push({
      category: "Business",
      summary:
        "A repeatable business task turned into a running workflow with clear oversight.",
      requirements: [
        { label: "Task to automate", value: clip(prompt, 70) },
        { label: "Trigger", value: "Scheduled or event-driven - to be confirmed" },
        { label: "Inputs and systems", value: "Apps and files involved" },
        { label: "Guardrails", value: "Human approval before anything leaves the business" },
      ],
      budgetEstimate: "6,000 - 25,000",
      timelineEstimate: "1 - 2 weeks",
      missing: [
        { label: "Which apps and files are involved", value: "" },
        { label: "How often it should run", value: "" },
        { label: "What must never happen automatically", value: "" },
      ],
      suggested: [
        "Which tools does this task touch today?",
        "Should it run on a schedule or react to an event?",
        "Where should a human still sign off before anything is sent?",
      ],
      fulfillmentMethod: "automate",
      nextAction:
        "DAILY AI maps the current steps, then builds and runs the workflow with an approval gate.",
      confidence: 88,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Workflow Build",
          description:
            "Workflow designed, connected and run in your own environment.",
          type: "direct",
          estimatedPrice: "8,000 - 18,000",
          estimatedTimeline: "7 - 10 days",
          confidence: 90,
          pros: ["Runs inside your tools", "Logged and reversible"],
          cons: ["Needs clean access to your existing systems"],
        },
        {
          id: "route-2",
          title: "Automation Specialist",
          description:
            "A specialist maps the process and hands over a documented build.",
          type: "marketplace_match",
          estimatedPrice: "15,000 - 25,000",
          estimatedTimeline: "2 weeks",
          confidence: 84,
          pros: ["Handles messy legacy steps", "Documented handover"],
          cons: ["Higher day rate"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (
    hasAny(lower, ["plumber", "electrician", "carpenter", "repair", "ac service", "cleaning", "salon", "barber", "local service", "nearby", "near me", "grocery", "tailor", "pest control", "interior designer", "tutor"]) ||
    (hasAny(lower, ["find"]) && hasAny(lower, ["service", "technician", "company", "provider", "shop"]))
  ) {
    plans.push({
      category: "Local Services",
      summary:
        "A trusted local provider, checked and booked, without the endless phone calls.",
      requirements: [
        { label: "Service needed", value: clip(prompt, 70) },
        { label: "Location", value: "City or locality - not yet stated" },
        { label: "Timing", value: "Preferred date and time window" },
        { label: "Trust criteria", value: "Verified, insured, reviewed" },
      ],
      budgetEstimate: "3,000 - 15,000",
      timelineEstimate: "Same day to 2 days",
      missing: [
        { label: "Your city or locality", value: "" },
        { label: "When do you need it", value: "" },
        { label: "Budget range for the visit", value: "" },
      ],
      suggested: [
        "Which city or locality should we search?",
        "Is this urgent, or can we schedule it this week?",
        "What matters most - price, speed or the highest rating?",
      ],
      fulfillmentMethod: "provider_match",
      nextAction:
        "DAILY AI matches verified providers near you and books the best rated one that fits your window.",
      confidence: 87,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Local Network",
          description:
            "Background-checked providers near you, with real job reviews.",
          type: "marketplace_match",
          estimatedPrice: "Market rate for the job",
          estimatedTimeline: "Same day",
          confidence: 92,
          pros: ["Only verified providers", "Upfront pricing before the visit"],
          cons: ["Availability depends on local supply"],
        },
        {
          id: "route-2",
          title: "Coordinator Handles Everything",
          description:
            "DAILY AI manages the job from booking through sign-off.",
          type: "human_review",
          estimatedPrice: "Service cost + coordination",
          estimatedTimeline: "2 - 3 days",
          confidence: 80,
          pros: ["One point of contact", "Quality checked before payment"],
          cons: ["Slightly slower for emergencies"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (hasAny(lower, "apartment flat 2bhk 3bhk 1bhk rent property house".split(" "))) {
    plans.push({
      category: "Local Services",
      summary: "A property search handled properly, with verified listings and site visits.",
      requirements: [
        { label: "Property", value: clip(prompt, 70) },
        { label: "Budget", value: "Not stated - sets the search radius" },
        { label: "Locality", value: "To be confirmed" },
        { label: "Verification", value: "Title, possession and registry checks" },
      ],
      budgetEstimate: "To be estimated",
      timelineEstimate: "3 - 5 days",
      missing: [
        { label: "Buy or rent", value: "" },
        { label: "Maximum budget", value: "" },
        { label: "Preferred localities", value: "" },
      ],
      suggested: [
        "Are you buying or renting?",
        "What is the maximum budget and preferred locality?",
        "Do you need a specific configuration, and is possession immediate?",
      ],
      fulfillmentMethod: "provider_match",
      nextAction:
        "DAILY AI filters verified listings to your budget and arranges site visits.",
      confidence: 86,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Verified Listings",
          description: "Direct-owner listings with title checks and scheduled visits.",
          type: "direct",
          estimatedPrice: "Zero brokerage",
          estimatedTimeline: "3 days",
          confidence: 91,
          pros: ["No brokerage", "Legal title verified"],
          cons: ["Inventory moves quickly"],
        },
        {
          id: "route-2",
          title: "Local Agent Match",
          description: "A local agent negotiates on your behalf across the market.",
          type: "marketplace_match",
          estimatedPrice: "Commission on sale",
          estimatedTimeline: "2 days",
          confidence: 84,
          pros: ["Full market coverage", "Negotiation handled"],
          cons: ["Commission applies"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (hasAny(lower, ["app", "android", "ios", "mobile app", "saas", "dashboard", "crm"])) {
    plans.push({
      category: "Digital & Technology",
      summary: "A working software product shaped around the job it has to do.",
      requirements: [
        { label: "Product", value: clip(prompt, 70) },
        { label: "Platform", value: "Web app first, mobile second" },
        { label: "Scope", value: "Core workflow only for v1" },
        { label: "Launch", value: "MVP in 3 - 4 weeks" },
      ],
      budgetEstimate: "60,000 - 150,000",
      timelineEstimate: "3 - 6 weeks",
      missing: [
        { label: "Who uses it and what job does it do", value: "" },
        { label: "Must-have integrations", value: "" },
        { label: "Budget ceiling and launch date", value: "" },
      ],
      suggested: [
        "What is the single job this product must do on day one?",
        "Which systems does it need to talk to?",
        "Do you have a budget ceiling and a date it must be live?",
      ],
      fulfillmentMethod: "coordinate",
      nextAction:
        "DAILY AI scopes an MVP around the core workflow and brings you a fixed-price plan.",
      confidence: 84,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Product Squad",
          description: "Design, build and ship run as one coordinated engagement.",
          type: "human_review",
          estimatedPrice: "75,000 - 150,000",
          estimatedTimeline: "4 - 6 weeks",
          confidence: 88,
          pros: ["One accountable team", "Fixed scope and price"],
          cons: ["Starts after scope is signed off"],
        },
        {
          id: "route-2",
          title: "Senior Engineer Match",
          description: "A vetted engineer or small team to build your defined scope.",
          type: "marketplace_match",
          estimatedPrice: "60,000 - 120,000",
          estimatedTimeline: "3 - 5 weeks",
          confidence: 85,
          pros: ["Direct with the builder", "Flexible start date"],
          cons: ["Coordination sits with you"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (hasAny(lower, ["teach", "learn", "course", "study", "tutoring", "explain", "understand"])) {
    plans.push({
      category: "Education",
      summary: "A learning path built around your level, your goal and your weekly hours.",
      requirements: [
        { label: "Topic", value: clip(prompt, 70) },
        { label: "Level", value: "Not stated - assumed beginner" },
        { label: "Format", value: "Written lessons with worked examples" },
        { label: "Cadence", value: "Self-paced, check-in optional" },
      ],
      budgetEstimate: "0 - 8,000",
      timelineEstimate: "2 - 4 weeks",
      missing: [
        { label: "Current level", value: "" },
        { label: "What success looks like", value: "" },
        { label: "How much time per week", value: "" },
      ],
      suggested: [
        "Where are you starting from with this?",
        "What would you like to be able to do afterwards?",
        "How many hours a week can you give it?",
      ],
      fulfillmentMethod: "ai_direct",
      nextAction:
        "DAILY AI builds your first module now and adapts the rest as you progress.",
      confidence: 86,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Guided Learning",
          description: "A personalised path, examples and checkpoints, generated for you.",
          type: "direct",
          estimatedPrice: "Free",
          estimatedTimeline: "Immediate start",
          confidence: 93,
          pros: ["Adapts to your pace", "Available immediately"],
          cons: ["No human accountability"],
        },
        {
          id: "route-2",
          title: "1:1 Tutor Match",
          description: "A matched tutor for live sessions and accountability.",
          type: "marketplace_match",
          estimatedPrice: "5,000 - 12,000",
          estimatedTimeline: "2 days",
          confidence: 85,
          pros: ["Live feedback", "Scheduled accountability"],
          cons: ["Higher cost"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (hasAny(lower, ["logo", "brand identity", "packaging design", "design a", "poster", "banner", "thumbnail"])) {
    plans.push({
      category: "Creative",
      summary: "A visual identity that looks deliberate, not generated.",
      requirements: [
        { label: "Deliverable", value: "Logo suite, colour and type system" },
        { label: "Applications", value: "Social, print and web" },
        { label: "Direction", value: "Modern, minimal, high contrast" },
        { label: "Files", value: "Vector masters plus web assets" },
      ],
      budgetEstimate: "6,000 - 20,000",
      timelineEstimate: "3 - 5 days",
      missing: [
        { label: "Brand name and what it does", value: "" },
        { label: "Any existing visual references", value: "" },
        { label: "Where the identity will be used first", value: "" },
      ],
      suggested: [
        "What is the brand name and what does the business do?",
        "Are there any brands whose look you admire?",
        "Where will this identity appear first - app, packaging, signage?",
      ],
      fulfillmentMethod: "ai_direct",
      nextAction:
        "DAILY AI generates three distinct directions and prepares them for a structured review.",
      confidence: 87,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Identity Studio",
          description: "Directions generated, critiqued and refined to a final system.",
          type: "direct",
          estimatedPrice: "6,000 - 12,000",
          estimatedTimeline: "4 days",
          confidence: 90,
          pros: ["Fast, systematic output", "Every file format delivered"],
          cons: ["Two refinement rounds included"],
        },
        {
          id: "route-2",
          title: "Brand Designer Match",
          description: "A designer builds the identity from a brief.",
          type: "marketplace_match",
          estimatedPrice: "15,000 - 20,000",
          estimatedTimeline: "6 days",
          confidence: 85,
          pros: ["Deep craft", "Full brand strategy"],
          cons: ["Longer, costlier"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (hasAny(lower, ["reel", "video edit", "youtube video", "short video", "clip"])) {
    plans.push({
      category: "Creative",
      summary: "A finished edit, cut for the platform it lives on.",
      requirements: [
        { label: "Format", value: "Vertical, 30 seconds, platform-ready" },
        { label: "Elements", value: "Captions, sound design, pacing" },
        { label: "Source", value: "Raw footage you will supply" },
        { label: "Output", value: "Master plus platform variants" },
      ],
      budgetEstimate: "2,000 - 9,000",
      timelineEstimate: "1 - 3 days",
      missing: [
        { label: "Video length and platform", value: "" },
        { label: "Brand assets and caption style", value: "" },
        { label: "Deadline", value: "" },
      ],
      suggested: [
        "Which platform is this for, and how long should it be?",
        "Do you have brand fonts and colours to apply?",
        "When do you need it back?",
      ],
      fulfillmentMethod: "ai_direct",
      nextAction:
        "DAILY AI cuts the first version with captions and music, ready for your notes.",
      confidence: 85,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Edit Suite",
          description: "Automated edit, captions and pacing, reviewed before delivery.",
          type: "direct",
          estimatedPrice: "2,000 - 4,000",
          estimatedTimeline: "2 days",
          confidence: 90,
          pros: ["Same-week delivery", "Fast caption accuracy"],
          cons: ["One revision round included"],
        },
        {
          id: "route-2",
          title: "Creator Match",
          description: "A matched editor with motion and storytelling experience.",
          type: "marketplace_match",
          estimatedPrice: "5,000 - 9,000",
          estimatedTimeline: "3 days",
          confidence: 86,
          pros: ["Premium motion design", "Unlimited revisions"],
          cons: ["Higher cost"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (hasAny(lower, ["contract", "nda", "legal", "agreement", "terms"])) {
    plans.push({
      category: "Business",
      summary: "A document drafted for your situation, then checked by a lawyer.",
      requirements: [
        { label: "Document", value: clip(prompt, 70) },
        { label: "Parties", value: "Not stated" },
        { label: "Jurisdiction", value: "India - to be confirmed" },
        { label: "Risk review", value: "Clause-level risk notes included" },
      ],
      budgetEstimate: "4,000 - 15,000",
      timelineEstimate: "2 - 4 days",
      missing: [
        { label: "The parties involved", value: "" },
        { label: "Key commercial terms", value: "" },
        { label: "Governing jurisdiction", value: "" },
      ],
      suggested: [
        "Who are the parties and what is the commercial arrangement?",
        "Which jurisdiction governs the agreement?",
        "Are there any clauses you already know you need?",
      ],
      fulfillmentMethod: "human_escalation",
      nextAction:
        "DAILY AI drafts the structure and routes it to a lawyer for a reviewed final version.",
      confidence: 82,
      routes: [
        {
          id: "route-1",
          title: "DAILY AI Draft + Lawyer Review",
          description: "AI drafts in hours, a lawyer reviews and finalises.",
          type: "human_review",
          estimatedPrice: "4,000 - 15,000",
          estimatedTimeline: "3 days",
          confidence: 90,
          pros: ["Lawyer-checked", "Fast first draft"],
          cons: ["Legal advice still needs your sign-off"],
        },
      ],
      recommendedRouteId: "route-1",
    });
  }

  if (hasHistory && plans.length === 0) {
    plans.push({
      ...genericPlan(prompt),
      summary: `Continuing your request: ${clip(prompt, 110)}`,
      confidence: 80,
    });
  }

  return plans;
}

function genericPlan(prompt: string): MockPlan {
  return {
    category: "General",
    summary: clip(prompt, 120),
    requirements: [
      { label: "Request", value: clip(prompt, 140) },
      { label: "Execution", value: "Verified AI and human supervised fulfilment" },
      { label: "Owner", value: "One DAILY AI coordinator end to end" },
    ],
    budgetEstimate: "To be estimated",
    timelineEstimate: "24 - 48 hours",
    missing: [
      { label: "The outcome you need, in one sentence", value: "" },
      { label: "Your deadline", value: "" },
      { label: "Budget range, even an approximate one", value: "" },
    ],
    suggested: [
      "What does done look like for you?",
      "When do you need it, and is there a hard deadline?",
      "Is there a budget range we should stay inside?",
    ],
    fulfillmentMethod: "coordinate",
    nextAction:
      "Answer three questions and DAILY AI returns a fixed plan with routes, timing and price.",
    confidence: 78,
    routes: [
      {
        id: "route-1",
        title: "DAILY AI Orchestrated Fulfilment",
        description:
          "One accountable path from requirement to delivery, supervised end to end.",
        type: "direct",
        estimatedPrice: "Optimised best-value pricing",
        estimatedTimeline: "24 hours",
        confidence: 88,
        pros: ["Single point of accountability", "Transparent pricing"],
        cons: ["Complex multi-stage requests may need one clarification"],
      },
    ],
    recommendedRouteId: "route-1",
  };
}

export function analyzeRequirementMock(
  prompt: string,
  context?: AnalysisContext
): StructuredRequirement {
  const plans = buildPlans(prompt, context);
  const plan = plans[0] ?? genericPlan(prompt);

  const routes = plan.routes.length
    ? plan.routes
    : [
        {
          id: "route-1",
          title: "DAILY AI Orchestrated Fulfilment",
          description:
            "One accountable path from requirement to delivery, supervised end to end.",
          type: "direct" as const,
          estimatedPrice: "Optimised best-value pricing",
          estimatedTimeline: "24 hours",
          confidence: 88,
          pros: ["Single point of accountability", "Transparent pricing"],
          cons: ["Complex multi-stage requests may need one clarification"],
        },
      ];

  return normalizeRequirement(
    {
      category: plan.category,
      summary: plan.summary,
      requirements: plan.requirements,
      budgetEstimate: plan.budgetEstimate,
      timelineEstimate: plan.timelineEstimate,
      missingInformationQuestions: plan.missing,
      suggestedQuestions: plan.suggested,
      fulfillmentMethod: plan.fulfillmentMethod,
      nextAction: plan.nextAction,
      confidence: plan.confidence,
      fulfillmentRoutes: routes,
      recommendedRouteId: plan.recommendedRouteId,
    },
    { prompt }
  );
}

export const mockProvider: AIProvider = {
  id: "local-mock",
  label: "DAILY AI Local Engine (Free)",
  tier: "free",

  isConfigured() {
    return true;
  },

  async analyze(
    prompt: string,
    context?: AnalysisContext
  ): Promise<StructuredRequirement> {
    // A short, natural pause so the interaction feels considered rather than instant.
    await new Promise((resolve) => setTimeout(resolve, 420));
    return analyzeRequirementMock(prompt, context);
  },
};
