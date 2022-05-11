import { ApiProperty } from "@nestjs/swagger";

export class CheckClientCodeDto {
  @ApiProperty()
  clientCode: string
}