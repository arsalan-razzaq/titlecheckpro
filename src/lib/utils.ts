export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function sanitize(value: string) {
  return value.replace(/[<>]/g, "").trim().slice(0, 5000);
}

export function formatPrice(price: number | null, symbol: string, currency: string) {
  return price === null ? "Price coming soon" : `${symbol}${price.toFixed(2)} ${currency}`;
}

export function requestReference() {
  return `TCP-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}
