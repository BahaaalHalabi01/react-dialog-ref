import { type PropsWithChildren } from "react";
import { createAppContext } from "./context-creator";

interface Testing {
  hello: string;
  loading: true | undefined;
}

const testing: Partial<Testing> = {
  hello: undefined,
  loading: true,
};

const {
  helpers: [AppContext, value],
  useAppContext: _,
} = createAppContext(testing);

type AppProviderProps = PropsWithChildren;

// your providers...
export const AppProviders: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
};
