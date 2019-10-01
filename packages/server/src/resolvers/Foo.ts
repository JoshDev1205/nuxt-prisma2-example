import { subscriptionField } from 'nexus';
import { pubsub } from '..';

export const fooTrigger = 'FOO';

export const FooSubscription = subscriptionField('foo', {
  type: 'String',
  subscribe(_root, _args, { pubsub }) {
    return pubsub.asyncIterator<string>(fooTrigger);
  },
  resolve(payload) { return payload; },
});

// Trigger Foo event every 1000ms
let fooCounter = 0;
setInterval(() => {
  fooCounter = (fooCounter + 1) % 4;
  pubsub.publish(fooTrigger, `Foo ${fooCounter}`);
}, 1000);
