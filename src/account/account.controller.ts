import { Controller, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) {}

  @ApiTags('Account')
  @Post('/hide-account')
  hideAccount() {

  }

  @ApiTags('Account')
  @Post('/delete-account')
  deleteAccount() {

  }
}
