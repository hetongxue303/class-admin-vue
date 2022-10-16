import { useCookies } from "@vueuse/integrations/useCookies";
import { Const_Cookie } from "../constant/cookie";

const cookies = useCookies();

export const getToken = (): string => {
  return cookies.get(Const_Cookie.AUTHORIZATION_KEY);
};

export const removeToken = () => {
  cookies.remove(Const_Cookie.AUTHORIZATION_KEY);
};

export const setToken = (token: string) => {
  cookies.set(Const_Cookie.AUTHORIZATION_KEY, token);
};
