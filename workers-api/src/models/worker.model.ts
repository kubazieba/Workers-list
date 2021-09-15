import {Entity, model, property} from '@loopback/repository';

@model()
export class Worker extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  imie: string;

  @property({
    type: 'string',
    required: true,
  })
  nazwisko: string;

  @property({
    type: 'string',
    required: true,
  })
  dzial: string;

  @property({
    type: 'number',
    required: true,
  })
  wynagrodzenieKwota: number;

  @property({
    type: 'string',
    required: true,
  })
  wynagrodzenieWaluta: string;


  constructor(data?: Partial<Worker>) {
    super(data);
  }
}

export interface WorkerRelations {
  // describe navigational properties here
}

export type WorkerWithRelations = Worker & WorkerRelations;
