import type { ReactNode } from 'react';

interface ContextSectionProps {
  title: string;
  children: ReactNode;
}

function ContextSection({ title, children }: ContextSectionProps) {
  return (
    <div className="tf-context-section">
      <h3 className="tf-context-section-title">{title}</h3>
      <div className="tf-context-section-text">{children}</div>
    </div>
  );
}

export default ContextSection;
