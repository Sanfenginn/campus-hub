import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // 设置为全局模块
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          // keepAlive: 1000,
          onConnect: (connectionParams) => {
            console.log('Client connected for subscriptions.');
            try {
              console.log('connectionParams', connectionParams);
            } catch (error) {
              console.error('Connection error:', error);
              throw error; // 这将断开连接
            }
          },
          onDisconnect: (webSocket, context) => {
            console.log('Client disconnected from subscriptions.');
            if (context) {
              console.log('Disconnection context:', context);
            }
          },
        },
      },
      // subscriptions: {
      //   'graphql-ws': true,
      // },
      // subscriptions: {
      //   'graphql-ws': {
      //     path: '/graphql',
      //   },
      // },
      context: ({ req, res }) => ({ req, res }),
    }),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
