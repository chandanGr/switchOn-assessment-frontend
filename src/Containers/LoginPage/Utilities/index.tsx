export function emailValdation(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export function validatePassword(password: string, confirmPassword: string) {
  return password === confirmPassword ? true : false;
}