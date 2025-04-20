export function hasOnlyAllowedSearchParams(
  searchParams: URLSearchParams,
  allowedKeys: string[]
): boolean {
  const entries = Array.from(searchParams.entries());

  return (
    entries.every(([key]) => allowedKeys.includes(key)) &&
    entries.length === allowedKeys.length
  );
}
