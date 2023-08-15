import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { RequestHeader } from "./customHeader";
import { HeaderModel } from "./model/header.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get("/auth/:token")
  async getTodos(@RequestHeader(HeaderModel) headers: any, @Param("token") token): Promise<string> {
    console.log(headers);
    return await this.appService.auth(token);
  }

  @Post("/tokens")
  async insertarMongo(
    @RequestHeader(HeaderModel) headers: any,
    @Body() cc: CreditcardModel): Promise<string> {
    console.log(cc);
    return await this.appService.tokenize(cc);
  }
}
