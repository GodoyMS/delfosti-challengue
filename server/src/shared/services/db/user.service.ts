import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { UserModel } from '@user/models/user.schema';

class UserService {
   public async checkUserByEmailOrCod({email,codWorker}:{email:string,codWorker:string}): Promise<IUserDocument> {
      const query = {
         $or: [
            { email: Generators.lowerCase(email) },
            { codWorker: codWorker },
         ],
      };
      const existingUser = (await UserModel.findOne(query).exec()) as IUserDocument;
      return existingUser;
   }

   public async createUser(data: IUserDocument): Promise<void> {
      await UserModel.create(data);
   }



   public async getUserByEmail(
      email: string
   ): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOne({
         email,
      }).exec()) as IUserDocument;
      return user;
   }



   public async getUserById(id: string): Promise<IUserDocument> {
      const user: IUserDocument = (await UserModel.findOne({
         _id: id,
      }).exec()) as IUserDocument;
      return user;
   }

   public async getAllUsers({
      skip,
      limit,
      rol,
   }: {
      skip: number;
      limit: number;
      rol?: string;
   }): Promise<{ users: IUserDocument[]; total: number }> {
      const query: { rol?: string } = {};

      if (rol) {
         query.rol = rol;
      }
      const [users, total] = await Promise.all([
         UserModel.find(query)
            .skip(skip)
            .limit(limit)
            .exec(),
            UserModel.countDocuments(query)
      ]);
      return { users, total };
   }
}

export const userService: UserService = new UserService();
