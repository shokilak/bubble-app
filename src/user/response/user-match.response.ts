import { ApiProperty } from "@nestjs/swagger";

export class UserMatchResponse {
  @ApiProperty()
  id: number

  @ApiProperty()
  userAvatar: string
}