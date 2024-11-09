export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  Heigh = 'Heigh'
}

export enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Closed = 'Closed'
}

export type Ticket = {
  id: number
  subject: string
  // priority: 'Low' | 'Medium' | 'High'
  // status: 'Open' | 'In Progress' | 'Closed'
  priority: Priority
  status: Status
  description: string
}

