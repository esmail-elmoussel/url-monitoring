import { Optional } from 'sequelize';
import { PollRequestAttributes } from './poll-request.types';
import { UserAttributes } from './user.types';

export enum UrlStatuses {
  Up = 'up',
  Down = 'down',
}

export enum Protocols {
  Https = 'https',
  Http = 'http',
  Tcp = 'tcp',
}

export type UrlAttributes = {
  id: string;
  userId: string;
  user?: UserAttributes;
  status: UrlStatuses;
  name: string;
  baseUrl: string;
  protocol: Protocols;
  path?: string;
  port?: number;
  webhookUrl?: string;
  timeout: number;
  interval: number;
  threshold: number;
  failureCount: number;
  ignoreSSL?: boolean;
  createdAt: Date;
  updatedAt: Date;
  pollRequests?: PollRequestAttributes[];
  authentication?: {
    username: string;
    password: string;
  };
  httpHeaders?: {
    [key: string]: string;
  };
  assert?: {
    statusCode: number;
  };
};

export type UrlCreationAttributes = Optional<
  UrlAttributes,
  | 'id'
  | 'timeout'
  | 'interval'
  | 'threshold'
  | 'failureCount'
  | 'createdAt'
  | 'updatedAt'
>;

export interface RequestWithUrlAttributes extends UrlAttributes, Request {}

export interface UrlCreationDto {
  name: string;
  baseUrl: string;
  path?: string;
  port?: number;
  webhookUrl?: string;
  timeout?: number;
  interval?: number;
  threshold?: number;
  ignoreSSL?: boolean;
  authentication?: {
    username: string;
    password: string;
  };
  httpHeaders?: {
    [key: string]: string;
  };
  assert?: {
    statusCode: number;
  };
}
