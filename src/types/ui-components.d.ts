
// This file ensures proper typing for UI components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow any additional HTML attributes on standard elements
    }
  }
}

// Extend Radix UI component props to allow className and children where needed
declare module '@radix-ui/react-accordion' {
  interface AccordionItemProps {
    className?: string;
  }
  
  interface AccordionHeaderProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AccordionTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AccordionContentProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-alert-dialog' {
  interface AlertDialogOverlayProps {
    className?: string;
  }
  
  interface AlertDialogContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AlertDialogTitleProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AlertDialogDescriptionProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AlertDialogActionProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AlertDialogCancelProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-avatar' {
  interface AvatarProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AvatarImageProps {
    src?: string;
    alt?: string;
    className?: string;
  }
  
  interface AvatarFallbackProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-checkbox' {
  interface CheckboxIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-context-menu' {
  interface ContextMenuSubTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuSubContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuCheckboxItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuRadioItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuLabelProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuSeparatorProps {
    className?: string;
  }
  
  interface ContextMenuShortcutProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ContextMenuItemIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-dialog' {
  interface DialogProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DialogOverlayProps {
    className?: string;
  }
  
  interface DialogContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DialogTitleProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DialogDescriptionProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DialogCloseProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-dropdown-menu' {
  interface DropdownMenuTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuSubTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuSubContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuCheckboxItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuRadioItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuLabelProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuSeparatorProps {
    className?: string;
  }
  
  interface DropdownMenuShortcutProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DropdownMenuItemIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-hover-card' {
  interface HoverCardContentProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-label' {
  interface LabelProps {
    children?: React.ReactNode;
    htmlFor?: string;
    className?: string;
  }
}

declare module '@radix-ui/react-menubar' {
  interface MenubarProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarSubTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarSubContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarCheckboxItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarRadioItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarLabelProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarSeparatorProps {
    className?: string;
  }
  
  interface MenubarShortcutProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface MenubarItemIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-navigation-menu' {
  interface NavigationMenuProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface NavigationMenuListProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface NavigationMenuContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface NavigationMenuItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface NavigationMenuTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface NavigationMenuLinkProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface NavigationMenuIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface NavigationMenuViewportProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-popover' {
  interface PopoverContentProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-progress' {
  interface ProgressProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ProgressIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-radio-group' {
  interface RadioGroupProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface RadioGroupItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface RadioGroupIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-scroll-area' {
  interface ScrollAreaProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ScrollAreaViewportProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ScrollAreaScrollbarProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ScrollAreaThumbProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ScrollAreaCornerProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-select' {
  interface SelectTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SelectContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SelectItemProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SelectLabelProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SelectSeparatorProps {
    className?: string;
  }
  
  interface SelectValueProps {
    placeholder?: string;
    className?: string;
  }
  
  interface SelectItemTextProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SelectItemIndicatorProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SelectScrollUpButtonProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SelectScrollDownButtonProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-separator' {
  interface SeparatorProps {
    className?: string;
  }
}

declare module '@radix-ui/react-slider' {
  interface SliderProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SliderTrackProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SliderRangeProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SliderThumbProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-switch' {
  interface SwitchProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface SwitchThumbProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-tabs' {
  interface TabsListProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface TabsTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface TabsContentProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-toast' {
  interface ToastProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ToastTitleProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ToastDescriptionProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ToastActionProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ToastCloseProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-toggle' {
  interface ToggleProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-toggle-group' {
  interface ToggleGroupProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ToggleGroupItemProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-tooltip' {
  interface TooltipContentProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module 'vaul' {
  interface DialogOverlayProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface DialogContentProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module 'cmdk' {
  interface CommandProps {
    children?: React.ReactNode;
    className?: string;
  }
}

export {};
