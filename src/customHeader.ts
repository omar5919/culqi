import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export const RequestHeader = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    const dto = plainToInstance(value, headers, { excludeExtraneousValues: true });
    return validateOrReject(dto).then(
      (res) => {
        console.log(res);
        return dto;
      },
      (err) => {
        console.log(err);
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: "Missing Authorization Header"
        }, HttpStatus.FORBIDDEN);
      }
    );
  }
);