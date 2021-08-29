export function classes(...val: (string | boolean | undefined | null)[]): string {
  return val.filter(Boolean).join(" ");
}
