import type { MouseEvent } from 'react';

export function scrollToSection(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    // Only intercept same-page anchors: off the home route, let the browser
    // navigate to "/" normally and jump to the #id via the native hash scroll.
    if (window.location.pathname !== '/') return;
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
}
