import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';
import { UsersModule } from './users/users.module';
import { UsersAuthModule } from './users-auth/users-auth.module';
import { ApolloDriverConfig, ApolloDriver} from '@nestjs/apollo';
import { DermantinModule } from './dermantin/dermantin.module';
import { DermantinImageModule } from './dermantin-image/dermantin-image.module';
import { StoreModule } from './store/store.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(config: ConfigService) =>({
        type: config.get<'postgres'>('DB_CONNECTION'),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname+'dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        logging: true,
        synchronize: true
      })
    }),
    AdminModule,
    AuthModule,
    TypeModule,
    CategoryModule,
    UsersModule,
    UsersAuthModule,
    DermantinModule,
    DermantinImageModule,
    StoreModule,
    AdvertisementsModule,
    
],
  controllers: [],
  providers: [],
})
export class AppModule {}
