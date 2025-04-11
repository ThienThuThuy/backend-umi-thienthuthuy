import { connectDB } from "../config/database";
import { Group, CreateGroupResult } from "../models/groupModel";
class GroupService {
    private groupCollection: any;

    constructor() {
        this.init();
    }

    private async init() {
        try {
            const db = await connectDB();
            this.groupCollection = db.collection("groups");
        } catch (err) {
            console.error("Lỗi kết nối MongoDB:", err);
        }
    }

    public async createGroup(group: Omit<Group, "_id">): Promise<CreateGroupResult> {
        if (!this.groupCollection) return { success: false, message: "Chưa kết nối MongoDB!" };

        if (!group.groupName || !group.groupDescription) {
            return { success: false, message: "Thiếu thông tin nhóm!" };
        }

        const result = await this.groupCollection.insertOne(group);
        if (!result.insertedId) return { success: false, message: "Lỗi khi lưu nhóm!" };

        return {
            success: true,
        };
    }
}

export const groupService = new GroupService();
