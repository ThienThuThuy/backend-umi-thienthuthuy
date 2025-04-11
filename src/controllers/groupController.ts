import { Request, Response } from "express";
import { groupService } from "../services/groupService";
import { Group } from "../models/groupModel";

export const controllerGroup = async (req: Request, res: Response) => {
    const { groupName, groupDescription } = req.body;


    const result = await groupService.createGroup({ groupName, groupDescription });

    res.status(result.success ? 200 : 500).json(result);
    return;
};
