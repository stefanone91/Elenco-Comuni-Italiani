require("dotenv").config();

import { ElencoItem } from "./models/elenco-item.model";
import { convertCSVToJSON, readCsvFile, writeDateAsJson } from "./services/file.service";
import { getLocations } from "./services/locations.service";
import { logger } from "./services/logger";

async function main(): Promise<void> {
  logger.info("Elenco Comuni Italiani");

  logger.info("Reading data...");
  const csv = readCsvFile();
  const items = convertCSVToJSON(csv) as ElencoItem[];
  const { regions, provinces, towns } = getLocations(items);

  logger.info("Writing files...");
  writeDateAsJson("regions.json", regions);
  writeDateAsJson("provinces.json", provinces);
  writeDateAsJson("towns.json", towns);

  logger.info("Success");
}

main().catch((e) => {
  logger.error(e);
});
