import { ObjectId } from "mongodb";

export interface Group {
    _id?: ObjectId;
    groupName: string;
    groupDescription: string;
}

export interface CreateGroupResult {
    success: boolean;
    message?: string;
    group?: Omit<Group, "_id">;
}


