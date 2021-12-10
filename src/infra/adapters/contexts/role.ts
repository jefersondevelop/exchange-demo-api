import { MongoRoleRepository } from "../role/mongo_role_repository";
import { BasicRoleService } from "../role/basic_role_service";
import { GetRoleList } from "../../../domain/role/usecases/get_role_list";
import { RoleController } from "../../controllers/role_controller";

const repo = new MongoRoleRepository();

const service = new BasicRoleService(repo);
const listRoleUC = new GetRoleList(service);
const controller = new RoleController(listRoleUC);

export default controller;