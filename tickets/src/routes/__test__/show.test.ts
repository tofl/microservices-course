import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'A valid title',
        price = 20;

  const createTicketResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({ title, price })
    .expect(201);

  const getTicketResponse = await request(app)
    .get(`/api/tickets/${createTicketResponse.body.id}`)
    .send()
    .expect(200);

  expect(getTicketResponse.body.title).toEqual(title);
  expect(getTicketResponse.body.price).toEqual(price);
});
