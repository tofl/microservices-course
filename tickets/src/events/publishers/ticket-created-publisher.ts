import { Publisher, TicketCreatedEvent, Subjects } from '@tofl-ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
