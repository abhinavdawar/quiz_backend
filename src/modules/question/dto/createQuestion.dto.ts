import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateQuestionDto {
    @IsOptional()
    questionStatement: string;
    @IsOptional()
    userId: MongooseSchema.Types.ObjectId;
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
    @IsOptional()
    status: string;
    @IsOptional()
    options: Array<String>;
    @IsOptional()
    is_multiple: Boolean;
    
}
