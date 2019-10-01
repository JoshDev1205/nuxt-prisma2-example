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

// Trigger Foo event every 2000ms
setInterval(() => {
  pubsub.publish(fooTrigger, 'Hey');
}, 2000);
