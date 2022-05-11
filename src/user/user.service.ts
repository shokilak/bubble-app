import { Injectable } from '@nestjs/common';
import { UpdateProfileInfoDto } from "./dto/update-profile-info.dto";

@Injectable()
export class UserService {
  async updateProfileInfo(userData: UpdateProfileInfoDto) {

  }
}
