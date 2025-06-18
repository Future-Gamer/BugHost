
// Global type definitions for UI components
declare global {
  // Button types
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
    children?: React.ReactNode;
    className?: string;
  }

  // Input types
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
  }

  // Label types
  interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
    htmlFor?: string;
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

  // Card types
  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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

  interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Badge types
  interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    children?: React.ReactNode;
    className?: string;
  }

  // Textarea types
  interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
  }

  // Dropdown Menu types
  interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    children?: React.ReactNode;
    className?: string;
  }

  interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    children?: React.ReactNode;
    className?: string;
  }

  interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }

  interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
  }

  // Dialog types
  interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Select types
  interface SelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: React.ReactNode;
    className?: string;
  }

  interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
    className?: string;
  }

  // Toast types
  interface ToastProps extends React.HTMLAttributes<HTMLLIElement> {
    variant?: 'default' | 'destructive';
    children?: React.ReactNode;
    className?: string;
  }

  interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface ToastActionProps extends React.HTMLAttributes<HTMLButtonElement> {
    altText: string;
    children?: React.ReactNode;
    className?: string;
  }

  interface ToastCloseProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
  }

  // Tabs types
  interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string;
    children?: React.ReactNode;
    className?: string;
  }

  interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: React.ReactNode;
    className?: string;
  }

  // Popover types
  interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    children?: React.ReactNode;
    className?: string;
  }

  // Switch types
  interface SwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
  }

  // Checkbox types
  interface CheckboxProps extends React.HTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
  }

  interface CheckboxIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
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

  interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
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

  interface AlertDialogActionProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
  }

  interface AlertDialogCancelProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Accordion types
  interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    className?: string;
  }

  interface AccordionTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface AccordionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Command types
  interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
  }

  interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    heading?: string;
    children?: React.ReactNode;
    className?: string;
  }

  interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    onSelect?: (value: string) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
  }

  interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
  }

  interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
  }

  // Context Menu types
  interface ContextMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    inset?: boolean;
  }

  interface ContextMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
  }

  interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    inset?: boolean;
    children?: React.ReactNode;
    className?: string;
  }

  interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
    checked?: boolean;
    children?: React.ReactNode;
    className?: string;
  }

  interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children?: React.ReactNode;
    className?: string;
  }

  interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    inset?: boolean;
    children?: React.ReactNode;
    className?: string;
  }

  interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
  }

  interface ContextMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    className?: string;
  }
}

export {};
