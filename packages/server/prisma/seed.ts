import { Photon } from '@generated/photon';
import { hash } from 'bcryptjs';

const photon = new Photon();

async function main(): Promise<void> {
  await photon.connect();

  // Upsert administrator user
  const email = process.env.ADMIN_EMAIL || 'admin@localhost';
  const password=  process.env.ADMIN_PASSWORD || 'admin@localhost';
  const passwordHash = await hash(password, 10);
  await photon.users.upsert({
    where: { email },
    create: { email, password: passwordHash },
    update: { email, password: passwordHash },
  });
  console.log(`ℹ Upserted administrator user (${email} / ${password})`);

  await photon.disconnect();
}

main().catch(e => console.error(e));
