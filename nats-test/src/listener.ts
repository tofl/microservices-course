import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

import { TicketCreatedListener } from './events/ticketCreatedListener';

/*
1. démarrer l'environnement k8s (+ skaffold)
2. ouvrir un port pour rendre le pods du serveur nats accessible : k port-forward [pod name] 4222:4222
2. ouvrir un port pour rendre le monitoring de nats accessible : k port-forward [pod name] 8222:8222
3. Lancer le publisher et le events avec les scripts npm
 */

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', (() => {
    console.log('NATS connection closed.');
    process.exit();
  }));

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
