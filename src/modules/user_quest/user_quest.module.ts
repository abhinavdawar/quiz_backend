import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserQuest, UserQuestSchema } from '../../entities/user_quest.entity';
import { UserQuestRepository } from '../../repositories/user_quest.repository';
import { UserQuestController } from './user_quest.controller';
import { UserQuestService } from './user_quest.service';

@Module({
    imports: [ MongooseModule.forFeature([{ name: UserQuest.name, schema: UserQuestSchema }])],
    controllers: [UserQuestController],
    providers: [UserQuestService, UserQuestRepository],
    exports: [UserQuestService, UserQuestRepository],
})
export class UserQuestModule {}
