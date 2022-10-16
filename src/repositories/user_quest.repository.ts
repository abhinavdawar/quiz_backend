import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { Question } from '../entities/question.entity';
import { UserQuest } from '../entities/user_quest.entity';
import { CreateUserQuestDto } from '../modules/user_quest/dto/createUserQuest.dto';

export class UserQuestRepository {
    constructor(@InjectModel(UserQuest.name) private readonly userQuestModel: Model<UserQuest>) {}

    async createUserQuest(createUserQuestDto: CreateUserQuestDto, question: Question, userId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        let userQuest = new this.userQuestModel({
            user: userId,
            question: question._id,
            questionName: question.questionStatement
        });

        try {
            userQuest = await userQuest.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!userQuest) {
            throw new BadRequestException('UserQuest not created');
        }

        return userQuest;
    }

    async getUserQuests(query: { from: number; limit: number }) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let userQuests: UserQuest[];

        try {
            if (limit === 0) {
                userQuests = await this.userQuestModel
                    .find()
                    .populate('userQuest')
                    .populate('question')
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                userQuests = await this.userQuestModel
                    .find()
                    .populate('userQuest')
                    .populate('question')
                    .populate('user', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (userQuests.length > 0) {
                response = {
                    ok: true,
                    data: userQuests,
                    message: 'Get UserQuests Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay userQuests',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getUserQuestById(id: MongooseSchema.Types.ObjectId) {
        let userQuest;
        try {
            userQuest = await this.userQuestModel
                .findById(id)
                .populate('question')
                .populate('user', 'name email')
                .exec();
        } catch (error) {
            throw new BadRequestException(error);
        }

        if (!userQuest) {
            throw new NotFoundException('UserQuest not found');
        }

        return userQuest;
    }

    async getUserQuestByQuestionId(questionId: MongooseSchema.Types.ObjectId) {
        let userQuest;
        try {
            userQuest = await this.userQuestModel.find({ question: questionId }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!userQuest) {
            throw new NotFoundException('UserQuest not found');
        }

        return userQuest;
    }
}
