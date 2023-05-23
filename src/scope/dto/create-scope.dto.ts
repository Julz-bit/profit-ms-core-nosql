import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ScopeDto } from "./scope.dto";

export enum PriorityEnum {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Urgent = "Urgent"
}

export enum StatusEnum {
    Pending = "Pending",
    Ongoing = "Ongoing",
    Done = "Done",
    Last_files = "Last_files",
    New_files = "New_files"
}

export enum PaymentEnum {
    Unpaid = "Unpaid",
    Waiting = "Waiting",
    Paid = "Paid"
}

export class CreateScopeDto {
    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => ScopeDto)
    scopes: ScopeDto[];

    @ApiProperty()
    @IsNotEmpty()
    projectId: string;
}