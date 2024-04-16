import { type MutableRefObject } from "react";

export type RefInput = Record<string, unknown>;

export type ToRefObjectOptional<T extends RefInput> = {
  [P in keyof T]: MutableRefObject<T[P]>;
};

export type ToRefObject<T extends RefInput> = {
  [P in keyof T]: NonNullableRef<T[P]>;
};

export interface NonNullableRef<U> {
  current: NonNullable<U>;
}

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
