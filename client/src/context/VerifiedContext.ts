import { createContext } from "react";

export const VerifiedContext = createContext({
  verified: false,
  setVerified: (verified: boolean) => {},
});
