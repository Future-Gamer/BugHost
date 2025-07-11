
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

export {};
