import { Subjects, Publisher, ExpirationCompleteEvent } from '@tofl-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
