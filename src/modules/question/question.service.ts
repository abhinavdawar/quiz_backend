import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { QuestionRepository } from '../../repositories/question.repository';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';

@Injectable()
export class QuestionService {
    constructor(private questionRepository: QuestionRepository) {}

    async createQuestion(createQuestionDto: CreateQuestionDto, session: ClientSession) {
        return await this.questionRepository.createQuestion(createQuestionDto, session);
    }

    async getQuestionById(questionId: MongooseSchema.Types.ObjectId) {
        return await this.questionRepository.getQuestionById(questionId);
    }

    async getQuestions(getQueryDto: GetQueryDto) {
        return await this.questionRepository.getQuestions(getQueryDto);
    }

    async updateQuestion(updateQuestionDto: UpdateQuestionDto, session: ClientSession) {
        return await this.questionRepository.updateQuestion(updateQuestionDto, session);
    }
}
