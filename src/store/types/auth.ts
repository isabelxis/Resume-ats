
export interface AuthUser{
    id: number;
    email: string;
     plan: string;
}

export interface Profile{
    id: number;
    name?: string;
    email: string;
    plan: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    headline?: string;
}