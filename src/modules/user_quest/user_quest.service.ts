import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { UserQuestRepository } from '../../repositories/user_quest.repository';
import { UpdateQuestionDto } from '../question/dto/updateQuestion.dto';
import { QuestionService } from '../question/question.service';
import { UserService } from '../user/user.service';
import { CreateUserQuestDto } from './dto/createUserQuest.dto';

@Injectable()
export class UserQuestService {
    constructor(private saleRepository: UserQuestRepository, private readonly userService: UserService, private readonly questionService: QuestionService) {}

    async createUserQuest(createUserQuestDto: CreateUserQuestDto, session: ClientSession) {
        const { userId, questionId } = createUserQuestDto;

        const getUser: any = await this.userService.getUserById(userId);

        if (getUser.role !== 'ADMIN') {
            throw new UnauthorizedException('Incorrect Role');
        }

        const question = await this.questionService.getQuestionById(questionId);
        const createdUserQuest = await this.saleRepository.createUserQuest(createUserQuestDto, question, userId, session);

        const updateQuestionDto: UpdateQuestionDto = {
            id: question._id,
            status: 'SOLD',
        };
        await this.questionService.updateQuestion(updateQuestionDto, session);

        return createdUserQuest;
    }

    async getUserQuestById(saleId: MongooseSchema.Types.ObjectId) {
        return await this.saleRepository.getUserQuestById(saleId);
    }

    async getUserQuests(query: { from: number; limit: number }) {
        return await this.saleRepository.getUserQuests(query);
    }
}
