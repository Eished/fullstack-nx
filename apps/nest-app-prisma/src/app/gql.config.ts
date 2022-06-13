import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { User } from 'nexus-prisma'
// import {
//   asNexusMethod,
//   makeSchema,
//   mutationType,
//   objectType,
//   queryType,
// } from '@nexus/schema'
import { makeSchema, objectType,queryType,mutationType,asNexusMethod } from 'nexus'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'
import * as path from 'path'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<GqlModuleOptions> {
      
      const schema = makeSchema({
        shouldExitAfterGenerateArtifacts: process.env.NEXUS_SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === 'true',
        typegenAutoConfig: {
          contextType: '{ prisma: PrismaClient.PrismaClient }',
          sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
        },
        outputs: {
          typegen: path.join(__dirname, 'node_modules/@types/typegen-nexus/index.d.ts'),
          schema: path.join(__dirname, './api.graphql'),
        },
        plugins: [
          nexusPrisma({
            experimentalCRUD: true,
          })
        ],
        types: [
          asNexusMethod(JSONObjectResolver, 'json'),
          asNexusMethod(DateTimeResolver, 'date'),
          queryType({
            definition(t:any) {
              t.crud.user()
              t.crud.users({ ordering: true, filtering: true })
              t.crud.post()
              t.crud.posts({ ordering: true, filtering: true })
            },
          }),
          mutationType({
            definition(t:any) {
              t.crud.createOneUser()
              t.crud.createOnePost()
              t.crud.deleteOneUser()
              t.crud.deleteOnePost()
            },
          }),
          objectType({
            name: 'User',
            definition(t:any) {
              t.model.id()
              t.model.createdAt()
              t.model.email()
              t.model.name()
              t.model.posts()
            },
          }),

          objectType({
            name: 'Post',
            definition(t:any) {
              t.model.id()
              t.model.author()
              t.model.title()
              t.model.published()
              t.model.createdAt()
              t.model.updatedAt()
            },
          }),
        ],
      })

      return {
          debug: true,
          playground: true,
          schema,
          context: {prisma}
      };
    }
  }