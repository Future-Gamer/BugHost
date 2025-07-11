
declare module 'lucide-react' {
  import { LucideProps as OriginalLucideProps } from 'lucide-react';
  
  export interface LucideProps extends OriginalLucideProps {
    className?: string;
  }
  
  export * from 'lucide-react';
}
