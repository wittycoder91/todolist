import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userService.getOneUser({ email });
  if (!findUser)
    res
      .json({
        success: true,
        message: "There is no user information you selected.",
      })
      .status(httpStatus.OK);
  if (findUser.deletedAt) return null;
  const compare = await comparePassword(password, findUser.password);
  if (!compare) return null;
  const token = generateToken(findUser.uuid);
  res.json({ token }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);
