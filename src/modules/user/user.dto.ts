import { MinLength, IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {
  @Length(3, 250, { message: 'Deve conter de $constraint1 a $constraint2 caracteres' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsString({ message: 'Deve ser um texto' })
    name: string

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsString({ message: 'Deve ser um texto' })
    email: string

  @MinLength(6, { message: 'Deve conter no mínimo $constraint1 caracteres' })
  @Matches(/[0-9]{2,}/, { message: 'A senha deve conter 2 números' })
  @Matches(/[a-z]{2,}/, { message: 'A senha deve conter 2 letras minusculas' })
  @Matches(/[A-Z]{2,}/, { message: 'A senha deve conter 2 letras maiúsculas' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsString({ message: 'Deve ser um texto' })
    password: string
}
