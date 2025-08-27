import { useState, useEffect, useRef, useMemo } from 'react';

const COLOR_SCHEMES = ['no-preference', 'dark', 'light'];
const DEFAULT_TARGET_COLOR_SCHEME = 'light';

function resolveTargetColorScheme(scheme) {
  return COLOR_SCHEMES.includes(scheme) ? scheme : DEFAULT_TARGET_COLOR_SCHEME;
}

function getCurrentColorScheme() {
  const QUERIES = {};

  return (function () {
    for (let scheme of COLOR_SCHEMES) {
      const query = QUERIES[scheme] || (QUERIES[scheme] = window.matchMedia(`(prefers-color-scheme: ${scheme})`));
      if (query.matches) return { query, scheme };
    }
    return { query: null, scheme: DEFAULT_TARGET_COLOR_SCHEME }; // Fallback
  })();
}

export default function useColorScheme(targetColorScheme) {
  const isMounted = useRef(false);
  const colorScheme = useRef(getCurrentColorScheme());

  const targetScheme = useMemo(() => resolveTargetColorScheme(targetColorScheme), [targetColorScheme]);

  const [scheme, setScheme] = useState(colorScheme.current.scheme);

  useEffect(() => {
    const { query } = colorScheme.current;

    if (!query) return;

    const schemeChangeHandler = (evt) => {
      if (!evt.matches) return;

      const updated = getCurrentColorScheme();
      colorScheme.current = updated;

      if (isMounted.current) {
        setScheme(updated.scheme);
      }
    };

    query.addEventListener('change', schemeChangeHandler);
    isMounted.current = true;

    return () => {
      query.removeEventListener('change', schemeChangeHandler);
      isMounted.current = false;
    };
  }, []);

  return scheme === targetScheme;
}
