import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileInfoDto {
  @ApiProperty()
  secondName: string

  @ApiProperty()
  thirdName: string

  @ApiProperty()
  description: string

  @ApiProperty()
  searchGoal: string

  @ApiProperty()
  workPlace: string

  @ApiProperty()
  studyPlace: string

  @ApiProperty()
  height: number

  @ApiProperty()
  weight: number

  @ApiProperty()
  children: string
}