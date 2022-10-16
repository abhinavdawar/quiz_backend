import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { QuestionModule } from './modules/question/question.module';
import { UserQuestModule } from './modules/user_quest/user_quest.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule,
        // MongoDB Connection
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
        }),
        QuestionModule,
        UserModule,
        UserQuestModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
