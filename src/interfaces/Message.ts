export interface UserType {
    id: string;
    userNickName: string;
    side: 'Right' | 'Left';
    isMyMessage?: boolean;
}

export interface MessageType {
    user: UserType
    message: string;
}