export type usernameContext = {
    UserName: string | null;
    LogUserName: (arg: logInData) => void;
}

export type logInData = {
    username: string;
    password: string;
}