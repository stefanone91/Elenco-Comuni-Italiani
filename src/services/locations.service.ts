import { ElencoItem } from "../models/elenco-item.model";
import { Province } from "../models/province.model";
import { Region } from "../models/region.model";
import { Town } from "../models/town.model";

export function getLocations(items: ElencoItem[]) {
  // Create regions, provinces, towns
  const regions: Record<string, Region> = {};
  const provinces: Record<string, Province> = {};
  const towns: Record<string, Town> = {};

  for (const item of items) {
    const regionKey = item["Codice Regione"];
    const provinceKey = item["Codice Provincia (Storico)(1)"];
    const townKey = item["Codice Comune formato numerico"];

    // Regions
    if (!regions[regionKey]) {
      regions[regionKey] = {
        name: item["Denominazione Regione"].split("/")[0],
      };
    }
    // Provinces
    if (!provinces[provinceKey]) {
      provinces[provinceKey] = {
        name: item["Denominazione dell'Unità territoriale sovracomunale (valida a fini statistici)"].split("/")[0],
        parent_region: regionKey,
      };
    }
    // Towns
    if (!towns[townKey]) {
      towns[townKey] = {
        name: item["Denominazione in italiano"].split("/")[0],
        parent_region: regionKey,
        parent_city: provinceKey,
      };
    }
  }

  return { regions, provinces, towns };
}
