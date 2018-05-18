
export class Mediator {
  channels: any = {};

  subscribe(channel: string, subscriber: any) {
    if (this.channels[channel]) {
      this.channels[channel].push(subscriber);
    } else {
      this.channels[channel] = [subscriber];
    }
  }

  publish(channel: string, ...args: any[]) {
    var subscribers = this.channels[channel],
      subscriber;
    if (typeof subscribers !== 'undefined') {
      subscribers.forEach(function (subscriber: any) {
        subscriber.fn.apply(subscriber.context, args);
      });
    }
  }
};