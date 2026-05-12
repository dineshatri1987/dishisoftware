import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children' | 'ref'>;

export function Reveal<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useReveal<HTMLElement>();
  const cls = ['reveal', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
}
