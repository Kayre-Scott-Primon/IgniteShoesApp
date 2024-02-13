import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.User.addTag("user_email", email);
}

export function deleteTag(tag: string) {
  OneSignal.User.removeTag(tag);
}

export function tagUserInfoCreae(){ 
    OneSignal.User.addTags({
        "user_name": "Kayre",
        "user_age": "25",
    });
}

