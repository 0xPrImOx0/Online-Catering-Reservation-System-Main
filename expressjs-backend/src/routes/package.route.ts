//Package Related Routes
import { Router } from "express";
import {
  postPackage,
  deletePackage,
  featuredPackages,
  getPackage,
  getPackages,
  updatePackage,
} from "@controllers/package.controller.js";
import { isCaterer } from "@middlewares/auth.middleware.js";
import { packageValidationRules } from "@middlewares/validators/package.validator.js";

const packageRouter = Router();

//Get all Catering Package
packageRouter.get("/", getPackages);

//Get all  Featured Catering Package
packageRouter.get("/featured", featuredPackages);

//Get Catering Package Detail
packageRouter.get("/:id", getPackage);

//Create a new Catering Package
packageRouter.post("/", isCaterer, packageValidationRules.create, postPackage);

//Update a Catering Package
packageRouter.put(
  "/:id",
  isCaterer,
  packageValidationRules.update,
  updatePackage
);

//Delete a Catering Package
packageRouter.delete("/:id", isCaterer, deletePackage);

export default packageRouter;
