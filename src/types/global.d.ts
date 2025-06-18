
declare global {
  namespace React {
    type ReactNode = import('react').ReactNode;
    type ReactElement = import('react').ReactElement;
    type JSXElementConstructor<P> = import('react').JSXElementConstructor<P>;
    type ComponentType<P = {}> = import('react').ComponentType<P>;
    type FunctionComponent<P = {}> = import('react').FunctionComponent<P>;
    type ForwardRefExoticComponent<P> = import('react').ForwardRefExoticComponent<P>;
    type RefAttributes<T> = import('react').RefAttributes<T>;
    type PropsWithoutRef<P> = import('react').PropsWithoutRef<P>;
    type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = import('react').ComponentProps<T>;
    type ComponentRef<T extends React.ElementType> = import('react').ComponentRef<T>;
    type Ref<T> = import('react').Ref<T>;
    type Key = import('react').Key;
    type SyntheticEvent<T = Element, E = Event> = import('react').SyntheticEvent<T, E>;
    type MouseEvent<T = Element> = import('react').MouseEvent<T>;
    type KeyboardEvent<T = Element> = import('react').KeyboardEvent<T>;
    type FocusEvent<T = Element> = import('react').FocusEvent<T>;
    type ChangeEvent<T = Element> = import('react').ChangeEvent<T>;
    type ClipboardEvent<T = Element> = import('react').ClipboardEvent<T>;

    interface FC<P = {}> extends FunctionComponent<P> {}
    interface FormEvent<T = Element> extends SyntheticEvent<T> {}
    interface ElementRef<T> extends Ref<T> {}
    interface ComponentPropsWithoutRef<T> extends PropsWithoutRef<ComponentProps<T>> {}
    
    const useState: typeof import('react').useState;
    const useEffect: typeof import('react').useEffect;
    const useMemo: typeof import('react').useMemo;
    const useCallback: typeof import('react').useCallback;
    const useRef: typeof import('react').useRef;
    const forwardRef: typeof import('react').forwardRef;
    const createContext: typeof import('react').createContext;
    const useContext: typeof import('react').useContext;
    const useReducer: typeof import('react').useReducer;
    const useLayoutEffect: typeof import('react').useLayoutEffect;
    const useImperativeHandle: typeof import('react').useImperativeHandle;
    const useDebugValue: typeof import('react').useDebugValue;
    const memo: typeof import('react').memo;
    const Fragment: typeof import('react').Fragment;
    const StrictMode: typeof import('react').StrictMode;
    const Suspense: typeof import('react').Suspense;
    const lazy: typeof import('react').lazy;
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {}
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    interface LibraryManagedAttributes<C, P> extends React.LibraryManagedAttributes<C, P> {}
  }
}

export {};
