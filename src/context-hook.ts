import { type Context, useContext } from "react";
import { type ToRefObjectOptional, type ToRefObject } from "./types";
/**
 * Checks that all the context values exist
 */
export function useAppContextFetcher<T extends Record<string, unknown>>(
  ctx: Context<ToRefObject<T>>,
): () => ToRefObject<T> {
  function returnValues(): ToRefObject<T> {
    const values = useContext(ctx);

    function valuesExist(
      v: ToRefObjectOptional<Partial<T>>,
    ): asserts v is ToRefObject<T> {
      Object.keys(values).some((k) => {
        if (!v[k].current) {
          throw new Error(
            `key: ${k} is undefined, Are you Using Context Outside of Its Provider?`,
          );
        }
        return true;
      });
    }

    valuesExist(values);

    return values;
  }
  return returnValues;
}
