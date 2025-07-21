import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    refresh_token?: string;
}
