import { Injectable } from '@nestjs/common';
import { UpdateProfileInfoDto } from "./dto/update-profile-info.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) {
  }


  async updateProfileInfo(userData: UpdateProfileInfoDto) {

  }

  blackListUser(userId: string, banFlag: boolean) {
    
  }
}
