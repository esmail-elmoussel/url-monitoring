import { Optional } from 'sequelize';

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
}
