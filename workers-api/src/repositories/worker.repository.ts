import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Worker, WorkerRelations} from '../models';

export class WorkerRepository extends DefaultCrudRepository<
  Worker,
  typeof Worker.prototype.id,
  WorkerRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Worker, dataSource);
  }
}
