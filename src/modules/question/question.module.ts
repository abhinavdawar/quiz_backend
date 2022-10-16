import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Question, QuestionSchema } from '../../entities/question.entity';
import { QuestionRepository } from '../../repositories/question.repository';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
    controllers: [QuestionController],
    providers: [QuestionService, QuestionRepository],
    exports: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
