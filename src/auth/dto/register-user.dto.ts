export class RegisterUserDto {
  phoneNumber: string | null
  password: string
  passwordRepeat: string
  username: string
  first_name: string
  email: string
  birthday: Date
  sex: string
}