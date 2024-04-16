import { createRef } from "react";
import { type RefInput, type ToRefObject } from "./types";

/**
 * creates an object where the key is the key provided by the user
 * and the value is a ref with the type passed in by the user
 */
export function initialToRefs<T extends RefInput>(
  inital: Partial<T>,
): ToRefObject<T> {
  const values = {} as ToRefObject<T>;

  Object.keys(inital).forEach((k) => {
    Object.defineProperty(values, k, {
      value: createRef(),
      writable: true,
    });
  });

  return values;
}
