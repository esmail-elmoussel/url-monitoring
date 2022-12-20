/* eslint-disable @typescript-eslint/ban-ts-comment */
import sequelize from 'sequelize';

abstract class BaseRepository<M extends sequelize.Model, ModelAttributes> {
  protected model;

  constructor(model: sequelize.ModelStatic<M>) {
    this.model = model;
  }

  create(
    entity: sequelize.Utils.MakeNullishOptional<M['_creationAttributes']>,
    options?: sequelize.CreateOptions<sequelize.Attributes<M>>
  ): Promise<ModelAttributes> {
    // @ts-ignore
    return this.model.create(entity, { raw: true, nest: true, ...options });
  }

  findById(
    id: sequelize.Identifier,
    options?: Omit<
      sequelize.NonNullFindOptions<sequelize.Attributes<M>>,
      'where'
    >
  ): Promise<ModelAttributes | null> {
    // @ts-ignore
    return this.model.findByPk(id, { raw: true, nest: true, ...options });
  }

  findOne(
    options: sequelize.FindOptions<sequelize.Attributes<M>>
  ): Promise<ModelAttributes | null> {
    // @ts-ignore
    return this.model.findOne({ raw: true, nest: true, ...options });
  }

  find(
    options: sequelize.FindOptions<sequelize.Attributes<M>>
  ): Promise<ModelAttributes[]> {
    // @ts-ignore
    return this.model.findAll({ raw: true, nest: true, ...options });
  }

  update(
    entity: Partial<ModelAttributes>,
    options: sequelize.UpdateOptions<ModelAttributes>
  ) {
    return this.model.update(entity, options);
  }

  delete(options: sequelize.DestroyOptions<sequelize.Attributes<M>>) {
    return this.model.destroy(options);
  }
}

export { BaseRepository };
