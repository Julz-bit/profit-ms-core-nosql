import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaymentEnum, PriorityEnum, StatusEnum } from "../schema/scope.schema";

export class ScopeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PriorityEnum)
    priority: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(StatusEnum)
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    fee: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PaymentEnum)
    payment: string;
}