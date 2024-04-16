import {
  type MutableRefObject,
  useImperativeHandle,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface DialogRef<T, U> {
  toggle: DialogToggle<T, U>;
  value: boolean;
}

export interface DialogToggleParams<T = unknown, U = string> {
  open?: boolean;
  params?: T;
  next?: U;
  callBack?: () => void;
}

export type DialogToggle<T = unknown, U = string> = (
  params?: DialogToggleParams<T, U>,
) => void;

interface HookProps<
  T = Record<string, unknown>,
  U = string,
  Z = DialogToggle<T, U>,
> {
  dialogRef: MutableRefObject<DialogRef<T, U>>;
  initialParams?: T;
  toggle?: Z;
}

export const useToggleRef = <T, U>({
  dialogRef,
  initialParams,
  toggle: tog,
}: HookProps<T, U>): {
  state: [_: boolean, _: Dispatch<SetStateAction<boolean>>];
  toggle: DialogToggle<T, U>;
  params: [T | undefined, Dispatch<SetStateAction<T | undefined>>];
} => {
  const [o, setO] = useState(false);
  const [ini, setIni] = useState(initialParams);

  useImperativeHandle(dialogRef, () => ({
    toggle: tog ?? toggle,
    get value() {
      return o;
    },
  }));

  const toggle: DialogToggle<typeof ini, U> = (p): void => {
    if (p?.params) {
      setIni(p.params);
    }

    if (p?.open !== undefined) {
      setO(p.open);
      return;
    }

    /** just toggle if no values passed in */
    setO((cur) => !cur);
  };

  return {
    state: [o, setO] as const,
    toggle,
    params: [ini, setIni] as const,
  };
};
