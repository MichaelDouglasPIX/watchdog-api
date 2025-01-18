export default async function simulateLatency(): Promise<number> {
  const ms = Math.floor(Math.random() * 20000);
  console.log(`[simulateLatency] - ms:`, ms);

  return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}
