import Cookies from 'js-cookie';

export const auth_token_key = '7b4b2cb877e5bbe2ad4dbe3b65cb5ae6bbc56788';

export const setAuthToken = (token: string) => {
  Cookies.set(auth_token_key, token, {
    expires: 7, 
    secure: true, 
    sameSite: 'strict', 
    path: '/', 
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(auth_token_key);
};

export const removeAuthToken = () => {
  Cookies.remove(auth_token_key);
};