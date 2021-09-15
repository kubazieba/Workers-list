import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Worker} from '../models';
import {WorkerRepository} from '../repositories';

export class WorkerController {
  constructor(
    @repository(WorkerRepository)
    public workerRepository : WorkerRepository,
  ) {}

  @post('/workers')
  @response(200, {
    description: 'Worker model instance',
    content: {'application/json': {schema: getModelSchemaRef(Worker)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Worker, {
            title: 'NewWorker',
            exclude: ['id'],
          }),
        },
      },
    })
    worker: Omit<Worker, 'id'>,
  ): Promise<Worker> {
    return this.workerRepository.create(worker);
  }

  @get('/workers')
  @response(200, {
    description: 'Array of Worker model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Worker, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Worker) filter?: Filter<Worker>,
  ): Promise<Worker[]> {
    return this.workerRepository.find(filter);
  }
  
}
