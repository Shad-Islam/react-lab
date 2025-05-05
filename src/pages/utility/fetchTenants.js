export async function fetchTenents() {
  const response = await fetch("http://localhost:8080/tenant");

  if (!response.ok) {
    throw new Error(`Failed to fetch tenants: ${response.status} ${response.statusText}`);
  }
  return response.json()
}
