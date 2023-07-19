import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateRuleDto {
  @Length(3, 50, { message: 'Deve conter de $constraint1 a $constraint2 caracteres' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @IsString({ message: 'Deve ser um texto' })
    name: string
}
