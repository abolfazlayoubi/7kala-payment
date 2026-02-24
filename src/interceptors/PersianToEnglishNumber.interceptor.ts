import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class PersianToEnglishNumberInterceptor implements NestInterceptor {
  public readonly logger = new Logger(PersianToEnglishNumberInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.debug("start");
    const request = context.switchToHttp().getRequest();
    const query = request.body;

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        query[key] = this.convertArabicToEnglish(query[key]);
      }
    }
    return next.handle();
  }

  private convertArabicToEnglish(text: string): string | number {
    if (["boolean", "object"].includes(typeof text)) return text;

    let isNumber = typeof text == "number";
    if (isNumber) text = text.toString();

    let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
      arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    for (let i = 0; i < 10; i++) {
      text = text.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
    }

    if (isNumber) return +text;
    return text;
  }
}
