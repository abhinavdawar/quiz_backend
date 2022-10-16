import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Question } from './question.entity';
import { User } from './user.entity';

@Schema()
export class UserQuest extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Question.name })
    question: MongooseSchema.Types.ObjectId;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const UserQuestSchema = SchemaFactory.createForClass(UserQuest);
