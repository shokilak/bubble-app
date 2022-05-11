import { ApiProperty } from "@nestjs/swagger";

export class CheckPhoneDto {
  @ApiProperty()
  phoneNumber: string
}