import type { ServiceId } from "@/lib/services";
import { AIVisual, AppsVisual, AutomationVisual, IntegrationsVisual, ModernVisual } from "./ServiceVisuals";

/** The visual used for each service (homepage cards, service pages, the Services menu and the showcase). */
export const SERVICE_ART: Record<ServiceId, React.ComponentType> = {
  apps: AppsVisual,
  automation: AutomationVisual,
  ai: AIVisual,
  integrations: IntegrationsVisual,
  modernisation: ModernVisual,
};
