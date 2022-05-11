import { ApiProperty } from "@nestjs/swagger";

export class CheckBotCodeDto {
  @ApiProperty()
  botCode: string
}