import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from '../modules/question/dto/createQuestion.dto';
import { UpdateQuestionDto } from '../modules/question/dto/updateQuestion.dto';

export class QuestionRepository {
    constructor(@InjectModel(Question.name) private readonly questionModel: Model<Question>) {}

    async createQuestion(createQuestionDto: CreateQuestionDto, session: ClientSession) {
        let question = new this.questionModel({
            user: createQuestionDto.userId,
            questionStatement: createQuestionDto.questionStatement,
            status: createQuestionDto.status,
            options: createQuestionDto.options,
            is_multiple: createQuestionDto.is_multiple
        });
        try {
            question = await question.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return question;
    }

    async updateQuestion(updatequestion: UpdateQuestionDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            status: updatequestion.status,
            updatedAt: actualDate,
        };

        let question;
        try {
            question = await this.questionModel
                .findOneAndUpdate({ _id: updatequestion.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!question) {
            throw new ConflictException('Error trying to update question');
        }

        return question;
    }

    async getQuestions(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let questions: Question[];

        try {
            if (limit === 0) {
                questions = await this.questionModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                questions = await this.questionModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (questions.length > 0) {
                response = {
                    ok: true,
                    data: questions,
                    message: 'Get questions Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay questions',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getQuestionById(id: MongooseSchema.Types.ObjectId) {
        let question;
        try {
            question = await this.questionModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!question) {
            throw new NotFoundException('The question with this id does not exist');
        }

        return question;
    }
}
