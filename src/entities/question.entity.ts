import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from './user.entity';

@Schema()
export class Question extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    questionStatement: string;

    @Prop({ type: String, enum: ['ACTIVE', 'NON-ACTIVE'] })
    status: string;

    @Prop({type: Array})
    options: Array<String>;

    @Prop({type: Boolean})
    is_multiple: Boolean;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
