import { useEffect } from 'react';

function ensureTag(selector, tagName, attrs = {}) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement(tagName);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    document.head.appendChild(node);
  }
  return node;
}

export default function usePageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    document.title = title;

    const descriptionMeta = ensureTag('meta[name="description"]', 'meta', { name: 'description' });
    descriptionMeta.setAttribute('content', description);

    const canonical = ensureTag('link[rel="canonical"]', 'link', { rel: 'canonical' });
    canonical.setAttribute('href', `https://learn-powershell-in-30-days.nealfrazier.tech${path}`);

    const ogTitle = ensureTag('meta[property="og:title"]', 'meta', { property: 'og:title' });
    ogTitle.setAttribute('content', title);

    const ogDescription = ensureTag('meta[property="og:description"]', 'meta', { property: 'og:description' });
    ogDescription.setAttribute('content', description);

    const ogUrl = ensureTag('meta[property="og:url"]', 'meta', { property: 'og:url' });
    ogUrl.setAttribute('content', `https://learn-powershell-in-30-days.nealfrazier.tech${path}`);

    const twitterTitle = ensureTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title' });
    twitterTitle.setAttribute('content', title);

    const twitterDescription = ensureTag('meta[name="twitter:description"]', 'meta', { name: 'twitter:description' });
    twitterDescription.setAttribute('content', description);
  }, [description, path, title]);
}
