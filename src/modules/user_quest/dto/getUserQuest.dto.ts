import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class GetUserQuestDto {
    @IsOptional()
    id: MongooseSchema.Types.ObjectId

    @IsOptional()
    from: number

    @IsOptional()
    limit: number
}
