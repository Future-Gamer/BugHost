
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
    type FormEvent<T = Element> = import('react').FormEvent<T>;
    type HTMLAttributes<T> = import('react').HTMLAttributes<T>;
    type InputHTMLAttributes<T> = import('react').InputHTMLAttributes<T>;
    type TextareaHTMLAttributes<T> = import('react').TextareaHTMLAttributes<T>;
    type ButtonHTMLAttributes<T> = import('react').ButtonHTMLAttributes<T>;
    type LabelHTMLAttributes<T> = import('react').LabelHTMLAttributes<T>;
    type ElementRef<T extends React.ElementType> = import('react').ComponentRef<T>;
    type ComponentPropsWithoutRef<T extends React.ElementType> = import('react').PropsWithoutRef<import('react').ComponentProps<T>>;

    interface FC<P = {}> extends FunctionComponent<P> {}
    interface ElementRef<T> extends Ref<T> {}
    
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

  // Lucide React icon props
  interface LucideProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }

  // Dialog component types
  interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Label component types  
  interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
    className?: string;
    htmlFor?: string;
  }

  // Select component types
  interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    value?: string;
  }

  interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
    className?: string;
  }

  // Input and Textarea props
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
  }

  interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    id?: string;
    rows?: number;
  }

  // Card component types
  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Skeleton component
  interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
  }

  // Badge component types
  interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }

  // Button component types
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }

  // Dropdown menu types
  interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    asChild?: boolean;
    className?: string;
  }

  interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    align?: 'start' | 'center' | 'end';
  }

  interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }

  interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Avatar types
  interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    className?: string;
  }

  interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Alert Dialog types
  interface AlertDialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
  }

  interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
  }

  interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Switch component types
  interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
  }

  // Accordion component types
  interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    value: string;
    disabled?: boolean;
  }

  interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AccordionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }
}

export {};
