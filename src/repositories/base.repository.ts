import sequelize from 'sequelize';

abstract class BaseRepository<M extends sequelize.Model> {
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
    values: {
      [key in keyof sequelize.Attributes<M>]?:
        | sequelize.Utils.Fn
        | sequelize.Utils.Col
        | sequelize.Utils.Literal
        | sequelize.Attributes<M>[key]
        | undefined;
    },
    options: Omit<
      sequelize.UpdateOptions<sequelize.Attributes<M>>,
      'returning'
    > & { returning: true | (keyof sequelize.Attributes<M>)[] }
  ) {
    return this.model.update(values, options);
  }

  delete(options: sequelize.DestroyOptions<sequelize.Attributes<M>>) {
    return this.model.destroy(options);
  }
}

export { BaseRepository };
