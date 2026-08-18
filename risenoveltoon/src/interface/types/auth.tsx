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

// local에 저장할 정보
export interface UserFormData {
    nickname? : string;
    currentBalance? : number;
    cpName? : string;
}

// 닉네임, CP네임 변경 
export interface InfoChangeData {
    nickname? : string;
    cpName? : string;
}

export interface MyPageData {
    nickname? : string;
    currentBalance? : number;
    cpName? : string;
}