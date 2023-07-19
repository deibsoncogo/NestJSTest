import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common'
import { ValidationError } from '@nestjs/common/interfaces'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipeCustomized implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value

    const object = plainToInstance(metatype, value)

    const errors: ValidationError[] = await validate(object)

    const target = errors[0]?.target

    const inputs = errors.map(({ property, constraints, contexts }) => ({
      property, constraints, contexts,
    }))

    if (errors.length > 0) throw new UnprocessableEntityException({ target, inputs })

    return value
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
