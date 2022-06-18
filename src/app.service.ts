import { Get, Injectable } from '@nestjs/common';
import { UserMatchResponse } from "./user/response/user-match.response";
import { ApiTags } from "@nestjs/swagger";

@Injectable()
export class AppService {
  constructor(

  ) {}

  getProfile() {

  }

  getMatch(user: UserMatchResponse) {

  }
}
