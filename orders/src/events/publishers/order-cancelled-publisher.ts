import { Publisher, OrderCancelledEvent, Subjects } from '@tofl-ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
