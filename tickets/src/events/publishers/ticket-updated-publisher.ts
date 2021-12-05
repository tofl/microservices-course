import { Publisher, TicketUpdatedEvent, Subjects } from '@tofl-ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
