import { Body, Controller, Post } from "@nestjs/common";
import { UpdateProfileInfoDto } from "./dto/update-profile-info.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('user')
export class UserController {
  @ApiTags('User')
  @Post('/update-profileInfo')
  async updateProfileInfo(@Body() body: UpdateProfileInfoDto) {

  }
}