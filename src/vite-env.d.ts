
/// <reference types="vite/client" />

declare module 'react' {
  export const useState: <S>(initialState: S | (() => S)) => [S, (value: S | ((prevState: S) => S)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const useMemo: <T>(factory: () => T, deps: any[]) => T;
  export const forwardRef: <T, P = {}>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
  
  export interface FC<P = {}> extends React.FunctionComponent<P> {}
  export interface FormEvent<T = Element> extends React.SyntheticEvent<T> {}
  export type ElementRef<T extends React.ElementType> = React.ComponentRef<T>;
  export type ComponentPropsWithoutRef<T extends React.ElementType> = React.PropsWithoutRef<React.ComponentProps<T>>;
}
