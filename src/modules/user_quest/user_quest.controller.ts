import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateUserQuestDto } from './dto/createUserQuest.dto';
import { UserQuestService } from './user_quest.service';

@Controller('userQuest')
export class UserQuestController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private userQuestService: UserQuestService) {}

    @Post('/createUserQuest')
    async createUserQuest(@Body() createUserQuestDto: CreateUserQuestDto, @Res() res: any) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newQuestion: any = await this.userQuestService.createUserQuest(createUserQuestDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newQuestion);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getUserQuestById/:id')
    async getUserQuestById(@Param('id') id: MongooseSchema.Types.ObjectId, @Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storage: any = await this.userQuestService.getUserQuestById(id);
        return res.status(HttpStatus.OK).send(storage);
    }
}
