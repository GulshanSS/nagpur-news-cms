import bcrypt from "bcrypt";

import config from "../config";

export const hash = async (data: string): Promise<string> =>
  await bcrypt.hash(data, config.SALT_ROUNDS);

export const compare = async (
  data: string,
  encryptedData: string
): Promise<boolean> => await bcrypt.compare(data, encryptedData);
