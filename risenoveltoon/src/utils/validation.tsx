import type {SignUpForm, FormErrors} from "../interface/types/auth.tsx";

/**
 * 개별 필드 유효성 검사 함수
 */
export const validateField = (
    name: keyof SignUpForm,
    value: string,
    form: SignUpForm
): string => {
    switch (name) {
        case "id":
            if (!value.trim()) return "아이디를 입력해 주세요.";
            if (!/^[a-zA-Z0-9]{4,12}$/.test(value)) return "영문 및 숫자 4~12자로 입력해 주세요.";
            return "";

        case "password":
            if (!value) return "비밀번호를 입력해 주세요.";
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/.test(value)) {
                return "영문, 숫자 포함 8~16자로 입력해 주세요.";
            }
            return "";

        case "passwordConfirm":
            if (!value) return "비밀번호 확인을 입력해 주세요.";
            if (value !== form.password) return "비밀번호가 일치하지 않습니다.";
            return "";

        case "nickname":
            if (!value.trim()) return "닉네임을 입력해 주세요.";
            if (value.length > 8) return "닉네임은 최대 8자까지 가능합니다.";
            return "";

        case "cpName":
            if (value.length > 2) return "주 CP명은 최대 2자까지 가능합니다.";
            return "";

        default:
            return "";
    }
};

/**
 * 전체 폼 유효성 검사 함수
 */
export const validateSignUpForm = (form: SignUpForm): FormErrors => {
    const errors: FormErrors = {};

    (Object.keys(form) as (keyof SignUpForm)[]).forEach((key) => {
        const error = validateField(key, form[key], form);
        if (error) {
            errors[key] = error;
        }
    });

    return errors;
};