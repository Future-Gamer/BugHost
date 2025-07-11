
// Extend lucide-react types to include className without overriding exports
import { LucideProps } from 'lucide-react';

declare module 'lucide-react' {
  interface LucideProps {
    className?: string;
  }
}
