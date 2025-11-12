import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller("payment")
export class PaymentController {
  constructor(protected paymentService: PaymentService) {}
  @Post("setPayment")
  setPayment(
    @Body()
    data: { id: number; amount: string; total: string; uuid: string; status: string; createdAt: string; updatedAt: string; customerName: string }[],
  ) {
    return this.paymentService.setPayment(data);
  }

  @Put("failed/:CartId")
  setFailed(@Param("CartId") id: number) {
    return this.paymentService.setFailed(id);
  }

  @Put("paid/:CartId")
  setPaid(@Param("CartId") id: number) {
    return this.paymentService.setPaid(id);
  }
}
