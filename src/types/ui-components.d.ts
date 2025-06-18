
declare module '@/components/ui/dialog' {
  export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@/components/ui/select' {
  export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    value?: string;
  }

  export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
    className?: string;
  }
}

declare module '@/components/ui/label' {
  export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
    className?: string;
    htmlFor?: string;
  }
}

declare module '@/components/ui/textarea' {
  export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    id?: string;
    rows?: number;
  }
}

declare module '@/components/ui/dropdown-menu' {
  export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    asChild?: boolean;
    className?: string;
  }

  export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    align?: 'start' | 'center' | 'end';
  }

  export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }
}

declare module '@/components/ui/avatar' {
  export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@/components/ui/alert-dialog' {
  export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }

  export interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module 'lucide-react' {
  export interface LucideProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }
}

export {};
