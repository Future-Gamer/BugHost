
declare global {
  namespace React {
    interface FC<P = {}> extends FunctionComponent<P> {}
    interface FormEvent<T = Element> extends SyntheticEvent<T> {}
    interface ElementRef<T> extends Ref<T> {}
    interface ComponentPropsWithoutRef<T> extends PropsWithoutRef<ComponentProps<T>> {}
    const useState: typeof import('react').useState;
    const useEffect: typeof import('react').useEffect;
    const useMemo: typeof import('react').useMemo;
    const forwardRef: typeof import('react').forwardRef;
  }
}

export {};
