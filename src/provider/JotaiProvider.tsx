"use client";

import { Provider } from "jotai";
import { getDefaultStore } from "jotai";

const store = getDefaultStore();
interface Props extends React.PropsWithChildren {}

export default function JotaiProvider({ children }: Props): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

export type { Props as JotaiProviderProps };
