import { Router } from "express";
import { createVisit , showVisit} from "../controllers/visit.controller.js";

export const visitRouter= Router()

visitRouter.route('/createVisit').post(createVisit)
visitRouter.route('/showVisit/:visitId').get(showVisit)

