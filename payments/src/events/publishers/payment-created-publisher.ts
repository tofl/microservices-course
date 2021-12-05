import { Subjects, Publisher, PaymentCreatedEvent } from '@tofl-ticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
