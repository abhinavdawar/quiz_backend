import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateUserQuestDto {

    @IsNotEmpty()
    questionId: MongooseSchema.Types.ObjectId;

    @IsNotEmpty()
    userId: MongooseSchema.Types.ObjectId;

}
