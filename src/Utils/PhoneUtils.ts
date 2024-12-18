import { PhoneNumberUtil } from "google-libphonenumber";

export class PhoneUtils {
  static isPhoneValid = (phone?: string) => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    if (!phone || phone.length == 0) {
      return true;
    } else {
      try {
        const parsedPhone = phoneUtil.parseAndKeepRawInput(phone);
        return phoneUtil.isValidNumber(parsedPhone);
      } catch (error) {
        return false;
      }
    }
  };
}
