import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreateUserQuestDto } from './createUserQuest.dto';

export class UpdateUserQuestDto extends PartialType(CreateUserQuestDto) {
    @IsNotEmpty()
    payedAmount: number;

    @IsOptional()
    observation: string;
}
