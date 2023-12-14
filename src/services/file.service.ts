import fs from "fs";
import { csv2json } from "json-2-csv";
import path from "path";
import { logger } from "./logger";

export function readCsvFile(): string {
  const absoluteFilePath = path.join(__dirname, "../../", process.env.INPUT_FILE_PATH || "");
  let result = fs.readFileSync(absoluteFilePath, { encoding: "latin1" });
  logger.debug(`File ${absoluteFilePath} read successfully`);
  result = result.replace(new RegExp(`"([^\;]+)\\n([^\;]+)"`, "gm"), (match, a, b) => a + b);
  return result;
}

export function convertCSVToJSON(csv: string) {
  logger.debug(`Converting CSV to JSON`);
  const json = csv2json(csv, { delimiter: { field: ";" } });
  logger.debug(`CSV file read as JSON successfully`);
  return json;
}

export function writeDateAsJson(fileName: string, data: any) {
  const absoluteFilePath = path.join(__dirname, "../../outputs", fileName);
  logger.debug(`Writing file ${absoluteFilePath}`);
  fs.writeFileSync(absoluteFilePath, JSON.stringify(data, undefined, 2));
  logger.debug(`File ${absoluteFilePath} wrote successfully`);
}
