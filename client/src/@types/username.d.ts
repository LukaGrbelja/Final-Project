export type usernameContext = {
    UserName: string | null;
    LogUserName: (arg: logInData | signUpData | null) => void;
}

export type logInData = {
    username: string;
    password: string;
}

export type signUpData = {
    username: string;
    password: string;
    confirmation: string;
    email: string;
}

export type submitProcess = {
    processStatus: boolean | "await";
    response: string;
}

export type dataRequest = {
    type: "cookies" | "latest" | "rating" | "comments";
    dataTypes: "movies" | "series";
    data: Array<any> | {
        from: number;
        to: number;
    };
}