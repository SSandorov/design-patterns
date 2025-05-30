import { COLORS } from "../../helpers/colors.ts";

export class LocalLogger {
  constructor(private file: string) {}

  writeLog(msg: string): void {
    console.log(`[${this.file} Log] ${msg}`);
  }

  writeError(msg: string): void {
    console.log(`%c[${this.file} Error] ${msg}`, COLORS.red);
  }

  writeWarning(msg: string): void {
    console.log(`%c[${this.file} Warning] ${msg}`, COLORS.yellow);
  }
}
