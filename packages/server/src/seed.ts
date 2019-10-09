import { photon } from './lib';
import * as seeds from './seeds';

async function main(): Promise<void> {
  await photon.connect();
  for (const seed of Object.values(seeds)) {
    await seed.main();
  }
  await photon.disconnect();
}

main().catch(e => console.error(e));
