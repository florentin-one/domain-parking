export function escapeHtml(input: string): string {
  return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export function textHtml(input: string): string {
  return escapeHtml(input);
}

export function link(href: string, text: string): string {
  return `<a href="${escapeHtml(href)}">${textHtml(text)}</a>`;
}

export function externalLink(href: string, text: string): string {
  return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${textHtml(text)}</a>`;
}
