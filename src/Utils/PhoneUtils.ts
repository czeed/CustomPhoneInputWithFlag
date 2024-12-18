import { PhoneNumberUtil } from "google-libphonenumber";

export class PhoneUtils {
  static isPhoneValid = (phone?: string) => {
    console.log(phone);
    const phoneUtil = PhoneNumberUtil.getInstance();
    if (!phone || phone.length == 0) {
      return true;
    } else {
      try {
        const parsedPhone = phoneUtil.parseAndKeepRawInput(phone);
        console.log("==>", phoneUtil.isValidNumber(parsedPhone));
        return phoneUtil.isValidNumber(parsedPhone);
      } catch (error) {
        return false;
      }
    }
  };
}
