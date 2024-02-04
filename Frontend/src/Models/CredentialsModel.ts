export default class Credentials {
    email: string;
    password: string;

    constructor(credentials: { email: string, password: string }) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    public static emailValidation = {
        required: { value: true, message: "Email is required" },
        pattern: { value: /^\S+@\S+$/, message: "Email is invalid" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Password is required" },
        minLength: { value: 4, message: "Password must be at least 4 characters" },
        maxLength: { value: 20, message: "Password cannot exceed 20 characters" }
    }
}