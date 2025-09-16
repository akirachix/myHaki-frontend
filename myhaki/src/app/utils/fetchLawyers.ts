// const baseUrl = '/api/lawyers';

// export async function fetchLawyers() {
//   try {
//     const response = await fetch(baseUrl);
//     if (!response.ok) {
//       throw new Error('Something went wrong: ' + response.statusText);
//     }
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     throw new Error('Failed to fetch lawyers: ' + (error as Error).message);
//   }
// }
export async function fetchLawyers() {
   try {
     const res = await fetch("/api/lawyers", { cache: "no-store" });
     if (!res.ok) throw new Error("Failed to fetch lawyers");
     return await res.json();
   } catch (error) {
     console.error("fetchLawyers error:", error);
     return [];
   }
 }
 
