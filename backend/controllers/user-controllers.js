/**
 * Auth user/set token
 * route POST api/user/auth
 */
const authUser = (req, res) => {
  res.status(200).json({ message: "auth user" });
};

export { authUser };
