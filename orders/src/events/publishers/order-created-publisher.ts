import { Publisher, OrderCreatedEvent, Subjects } from '@tofl-ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
