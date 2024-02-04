export interface PublicUser {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin";
}

export default class User implements PublicUser {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "user" | "admin" = "user";

    constructor(user: { userId: number, firstName: string, lastName: string, email: string, password: string, role?: "user" | "admin" }) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        if (user.role) {
            this.role = user.role;
        }
    }

    public static firstNameValidation = {
        required: { value: true, message: "First name is required" },
        minLength: { value: 2, message: "First name must be at least 2 characters" },
        maxLength: { value: 20, message: "First name cannot exceed 30 characters" }
    }

    public static lastNameValidation = {
        required: { value: true, message: "Last name is required" },
        minLength: { value: 2, message: "Last name must be at least 2 characters" },
        maxLength: { value: 20, message: "Last name cannot exceed 30 characters" }
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

    public static roleValidation = {
        required: { value: true, message: "Role is required" },
        pattern: { value: /^user$|^admin$/, message: "Role is invalid" }
    }

}