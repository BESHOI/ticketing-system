import { Priority, Status, Ticket } from '@/types/tickets';
import { faker } from '@faker-js/faker';
import { NUMBER_OF_ITEMS } from './constant';

export const Tickets: Ticket[] = [];

// Generate mock data
for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
  Tickets.push({
    id: i + 1,
    subject: faker.lorem.words(),
    priority: faker.helpers.arrayElement([Priority.Low, Priority.Medium, Priority.Heigh]),
    status: faker.helpers.arrayElement([Status.Open, Status.InProgress, Status.Closed]),
    description: faker.lorem.sentences(),
  });
}
