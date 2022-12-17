import { Optional } from 'sequelize';

export type UserAttributes = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface RequestWithUserAttributes extends UserAttributes, Request {}

export interface DecodedToken {
  id: string;
}
