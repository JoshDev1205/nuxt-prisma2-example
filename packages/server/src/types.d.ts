import { Photon } from '@generated/photon';
import { PubSub } from "graphql-subscriptions";

export interface ApolloContext {
  photon: Photon;
  pubsub: PubSub;
  user: Express.User | null;
}

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }
  }
}

export interface Seed {
  main(): Promise<void>;
}
