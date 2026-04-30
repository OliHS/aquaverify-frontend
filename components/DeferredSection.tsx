import React, { useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  id: string;
  minHeightClassName?: string;
  rootMargin?: string;
  children: React.ReactNode;
}

export const DeferredSection: React.FC<DeferredSectionProps> = ({
  id,
  minHeightClassName = 'min-h-[560px]',
  rootMargin = '900px 0px',
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === `#${id}`;
  });

  useEffect(() => {
    const renderIfTargeted = () => {
      if (window.location.hash === `#${id}`) setShouldRender(true);
    };

    renderIfTargeted();
    window.addEventListener('hashchange', renderIfTargeted);

    return () => window.removeEventListener('hashchange', renderIfTargeted);
  }, [id]);

  useEffect(() => {
    if (shouldRender) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { rootMargin });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div id={shouldRender ? undefined : id} ref={ref} className={shouldRender ? undefined : minHeightClassName}>
      {shouldRender ? children : null}
    </div>
  );
};
