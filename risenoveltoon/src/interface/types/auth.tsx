export interface SignUpForm {
    id: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    cpName: string;
}

export type FormErrors = Partial<Record<keyof SignUpForm, string>>;