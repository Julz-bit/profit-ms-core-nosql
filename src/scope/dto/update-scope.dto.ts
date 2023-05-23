import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { PaymentEnum, PriorityEnum, StatusEnum } from "./create-scope.dto";

export class UpdateScopeDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsOptional()
    startDate: Date;

    @ApiProperty()
    @IsOptional()
    endDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    priority: PriorityEnum;

    @ApiProperty()
    @IsNotEmpty()
    status: StatusEnum;

    @ApiProperty()
    @IsNotEmpty()
    payment: PaymentEnum;

    @ApiProperty()
    @IsNotEmpty()
    fee: number;
}