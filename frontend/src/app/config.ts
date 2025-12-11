export interface AppConfig {
  apiBaseUrl: string;
  appEnv: string;
  stripePublishableKey: string;
}

// This file expects config.generated.ts to be created by scripts/generate-config.mjs
// npm scripts (prestart/prebuild/pretest) generate it from .env
import { appConfig as generated } from './config.generated';

export const appConfig: AppConfig = generated;
