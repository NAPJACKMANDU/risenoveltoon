// 회원가입
export interface SignUpForm {
    userId: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    cpName: string;
}

export type FormErrors = Partial<Record<keyof SignUpForm, string>>;

// 중복 확인
export interface CheckParam {
    title : string;
    checkData : string;
    isDisabled? : boolean;
    errorDisabled? : boolean;
}

export interface LoginForm {
    userId? : string;
    password? : string;
}

export interface UserFormData {
    nickname? : string;
    currentBalance? : number;
    cpName? : string;
}


export interface MyPageData {
    nickname? : string;
    cpName? : string;
}