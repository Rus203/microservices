import { AbstractDocument } from './abstract.entity';
import {
  ClientSession,
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  UpdateQuery,
  Types,
} from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(
    private readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await newDocument.save(options)).toJSON() as TDocument;
  }

  async find(entityFilterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(entityFilterQuery, {}, { lean: true });
  }

  async findOne(
    entityFilterQuery: FilterQuery<TDocument>,
    projection?: Record<string, unknown>,
  ): Promise<TDocument> {
    const document = await this.model.findOne(entityFilterQuery, projection, {
      lean: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<TDocument>,
    updatedData: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(
      entityFilterQuery,
      updatedData,
      { lean: true, new: true },
    );

    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery:`,
        entityFilterQuery,
      );
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    entityFilterQuery: FilterQuery<TDocument>,
    updatedEntityData: Partial<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndUpdate(entityFilterQuery, updatedEntityData, {
      new: true,
      lean: true,
      upsert: true,
    });
  }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async deleteMany(
    entityFilterQuery: FilterQuery<TDocument>,
  ): Promise<boolean> {
    const deletedResult = await this.model.deleteMany(entityFilterQuery);
    return deletedResult.deletedCount > 0;
  }
}
