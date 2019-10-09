import { Photon } from '@generated/photon';
import { PubSub } from "graphql-subscriptions";

export interface ApolloContext {
  photon: Photon;
  pubsub: PubSub;
  user: Express.User | null;
}
