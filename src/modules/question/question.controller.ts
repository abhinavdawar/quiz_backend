import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private questionService: QuestionService) {}

    @Post('/createQuestion')
    async createQuestion(@Body() createQuestionDto: CreateQuestionDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newQuestion: any = await this.questionService.createQuestion(createQuestionDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newQuestion);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Put('/updateQuestion/:id')
    async updateQuestion(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateQuestionDto: UpdateQuestionDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newQuestion: any = await this.questionService.updateQuestion(updateQuestionDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newQuestion);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getQuestionById/:id')
    async getQuestionById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.questionService.getQuestionById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @Get('/getQuestions')
    async getAllQuestions(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.questionService.getQuestions(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }
}
