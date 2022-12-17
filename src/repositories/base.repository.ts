import sequelize from 'sequelize';

abstract class BaseRepository<M extends sequelize.Model, ModelAttributes> {
  protected model;

  constructor(model: sequelize.ModelStatic<M>) {
    this.model = model;
  }

  create(
    entity: sequelize.Utils.MakeNullishOptional<M['_creationAttributes']>,
    options?: sequelize.CreateOptions<sequelize.Attributes<M>>
  ) {
    return this.model.create(entity, options);
  }

  findById(
    id: sequelize.Identifier,
    options?: Omit<
      sequelize.NonNullFindOptions<sequelize.Attributes<M>>,
      'where'
    >
  ) {
    return this.model.findByPk(id, options);
  }

  findOne(options: sequelize.FindOptions<sequelize.Attributes<M>>) {
    return this.model.findOne(options);
  }

  find(options: sequelize.FindOptions<sequelize.Attributes<M>>) {
    return this.model.findAll(options);
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
