
/// <reference types="vite/client" />

declare module 'react' {
  export const useState: <S>(initialState: S | (() => S)) => [S, (value: S | ((prevState: S) => S)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const useMemo: <T>(factory: () => T, deps: any[]) => T;
  export const useCallback: <T extends Function>(callback: T, deps: any[]) => T;
  export const useRef: <T>(initialValue: T | null) => MutableRefObject<T>;
  export const forwardRef: <T, P = {}>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
  export const createContext: <T>(defaultValue: T) => React.Context<T>;
  export const useContext: <T>(context: React.Context<T>) => T;
  export const useReducer: <R extends Reducer<any, any>>(reducer: R, initialState: ReducerState<R>) => [ReducerState<R>, Dispatch<ReducerAction<R>>];
  export const useLayoutEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const useImperativeHandle: <T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: any[]) => void;
  export const useDebugValue: <T>(value: T, format?: (value: T) => any) => void;
  export const memo: <P extends object>(Component: React.FunctionComponent<P>, propsAreEqual?: (prevProps: Readonly<React.PropsWithChildren<P>>, nextProps: Readonly<React.PropsWithChildren<P>>) => boolean) => React.NamedExoticComponent<P>;
  export const Fragment: React.ExoticComponent<{ children?: React.ReactNode }>;
  export const StrictMode: React.ExoticComponent<{ children?: React.ReactNode }>;
  export const Suspense: React.ExoticComponent<React.SuspenseProps>;
  export const lazy: <T extends React.ComponentType<any>>(factory: () => Promise<{ default: T }>) => React.LazyExoticComponent<T>;

  export interface FC<P = {}> extends React.FunctionComponent<P> {}
  export interface FormEvent<T = Element> extends React.SyntheticEvent<T> {}
  export type ElementRef<T extends React.ElementType> = React.ComponentRef<T>;
  export type ComponentPropsWithoutRef<T extends React.ElementType> = React.PropsWithoutRef<React.ComponentProps<T>>;
  export type ReactNode = React.ReactNode;
  export type ReactElement = React.ReactElement;
  export type JSXElementConstructor<P> = React.JSXElementConstructor<P>;
  export type ComponentType<P = {}> = React.ComponentType<P>;
  export type FunctionComponent<P = {}> = React.FunctionComponent<P>;
  export type ForwardRefExoticComponent<P> = React.ForwardRefExoticComponent<P>;
  export type RefAttributes<T> = React.RefAttributes<T>;
  export type PropsWithoutRef<P> = React.PropsWithoutRef<P>;
  export type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = React.ComponentProps<T>;
  export type ComponentRef<T extends React.ElementType> = React.ComponentRef<T>;
  export type Ref<T> = React.Ref<T>;
  export type MutableRefObject<T> = React.MutableRefObject<T>;
  export type Key = React.Key;
  export type SyntheticEvent<T = Element, E = Event> = React.SyntheticEvent<T, E>;
  export type MouseEvent<T = Element> = React.MouseEvent<T>;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  export type FocusEvent<T = Element> = React.FocusEvent<T>;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  export type ClipboardEvent<T = Element> = React.ClipboardEvent<T>;
  export type Context<T> = React.Context<T>;
  export type Reducer<S, A> = React.Reducer<S, A>;
  export type ReducerState<R extends Reducer<any, any>> = React.ReducerState<R>;
  export type ReducerAction<R extends Reducer<any, any>> = React.ReducerAction<R>;
  export type Dispatch<A> = React.Dispatch<A>;
  export type SetStateAction<S> = React.SetStateAction<S>;
  export type ExoticComponent<P = {}> = React.ExoticComponent<P>;
  export type NamedExoticComponent<P = {}> = React.NamedExoticComponent<P>;
  export type LazyExoticComponent<T extends React.ComponentType<any>> = React.LazyExoticComponent<T>;
  export type SuspenseProps = React.SuspenseProps;
  export type LibraryManagedAttributes<C, P> = React.LibraryManagedAttributes<C, P>;

  export interface HTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface ButtonHTMLAttributes<T> extends React.ButtonHTMLAttributes<T> {}
  export interface InputHTMLAttributes<T> extends React.InputHTMLAttributes<T> {}
  export interface TextareaHTMLAttributes<T> extends React.TextareaHTMLAttributes<T> {}
  export interface FormHTMLAttributes<T> extends React.FormHTMLAttributes<T> {}
  export interface DivHTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface SpanHTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface PHTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface H1HTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface H2HTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface H3HTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface H4HTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface H5HTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface H6HTMLAttributes<T> extends React.HTMLAttributes<T> {}
}
