import type { ServiceId } from "@/lib/services";
import { BridgeArt, CityArt, LoopArt, StrataArt, SunriseArt } from "./Art";

/** The illustration used for each service (homepage cards and service pages). */
export const SERVICE_ART: Record<ServiceId, React.ComponentType<{ className?: string }>> = {
  apps: CityArt,
  automation: StrataArt,
  ai: LoopArt,
  integrations: BridgeArt,
  modernisation: SunriseArt,
};
