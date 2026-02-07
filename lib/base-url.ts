import { getConfig } from "./config";

export function getBaseUrl() {
  const { Domain } = getConfig();
  return `https://${Domain}`;
}

export function getDomain() {
  const { Domain } = getConfig();
  return Domain;
}
