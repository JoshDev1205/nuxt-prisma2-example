import { Seed } from './types';
import { photon } from '../lib';
import { hash } from 'bcryptjs';

export const seedAdminUser: Seed = {
  main: async function (): Promise<void> {
    const email = process.env.ADMIN_EMAIL || 'admin@localhost';
    const password = process.env.ADMIN_PASSWORD || 'admin@localhost';
    const passwordHash = await hash(password, 10);

    // Upsert administrator user
    await photon.users.upsert({
      where: { email },
      create: { email, roles: { set: 'ADMINISTRATOR' }, password: passwordHash },
      update: { email, roles: { set: 'ADMINISTRATOR' }, password: passwordHash },
    });

    console.log(`ℹ Upserted administrator user (${email} / ${password})`);
  },
};
