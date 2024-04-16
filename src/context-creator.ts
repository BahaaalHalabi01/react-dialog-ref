import { createContext } from "react";
import { useAppContextFetcher } from "./context-hook";
import {
  type RefInput,
  type ToRefObject,
} from "./types";
import { initialToRefs } from "./helper";

interface AppContext<T extends RefInput = RefInput> {
  helpers: [
    ReturnType<typeof createContext<ReturnType<typeof initialToRefs<T>>>>,
    ReturnType<typeof initialToRefs<T>>,
  ];
  useAppContext: () => ToRefObject<T>;
}

/**
 * Takes in your inital values and creates the needed context with the initial value
 */
export const createAppContext = <T extends RefInput>(
  inital: Partial<T>,
): AppContext<T> => {

  const refs = initialToRefs(inital);
  const context = createContext(refs);

  const useAppContext = useAppContextFetcher(context);

  return { helpers: [context, refs] as const, useAppContext };
};
