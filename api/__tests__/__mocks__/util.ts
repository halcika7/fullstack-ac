import { Server } from 'http';

import supertest, { Test } from 'supertest';

import mongoose from 'mongoose';
import { App } from '../../src/app';

import { seedDb } from '../../src/database/seeder';

class HttpRequest {
  private static instance: HttpRequest;

  public static getInstance(): HttpRequest {
    if (!HttpRequest.instance) {
      HttpRequest.instance = new HttpRequest();
    }

    return HttpRequest.instance;
  }

  private readonly app: App;

  private server?: Server;

  private requestWithSupertest?: supertest.SuperAgentTest;

  private constructor() {
    this.app = new App(process.env.MONGO_URL as string);
  }

  async start() {
    this.server = await this.app.listen();

    await seedDb();

    this.requestWithSupertest = supertest.agent(this.server);
  }

  async close() {
    const collections = await mongoose.connection.db.collections();

    // eslint-disable-next-line no-restricted-syntax
    for (const collection of collections) {
      // eslint-disable-next-line no-await-in-loop
      await collection.deleteMany({});
    }

    await mongoose.connection.close();

    this.server?.close();
    this.server = undefined;
    this.requestWithSupertest = undefined;
  }

  getRequest() {
    return {
      post: this.hook('post'),
      get: this.hook('get'),
      put: this.hook('put'),
      patch: this.hook('patch'),
      delete: this.hook('delete'),
    };
  }

  private hook(method: 'post' | 'get' | 'put' | 'patch' | 'delete') {
    return (args: { url: string; token?: string }) => {
      const req = this.requestWithSupertest?.[method](args.url) as Test;

      if (args.token) {
        req.set('Authorization', `Bearer ${args.token}`);
      }

      return req;
    };
  }
}

export const instance = HttpRequest.getInstance();
