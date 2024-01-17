const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();

app.use(
  express.static(
    path.join(`${__dirname}/client/InfleanProject/InfleanProject/client/build`)
  )
);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(`${__dirname}/client/InfleanProject/client/build/index.html`)
  );
});
console.log(`${__dirname}/client/InfleanProject/client/build`);

const users = [
  {
    id: 1,
    username: "user1@gmail.com",
    password: "password1",
    nickname: "홍길동",
    profileImg:
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  {
    id: 2,
    username: "user2@gmail.com",
    password: "password2",
    nickname: "함승완",
    profileImg:
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  {
    id: 3,
    username: "user3@gmail.com",
    password: "password3",
    nickname: "철수",
    profileImg:
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = users.find((u) => u.username === username);

    console.log("user", user);
    console.log("password", password);
    if (!user) {
      console.log(`User not found for username: ${username}`);
      return res.status(400).json("Invalid email or password");
    }

    console.log(`User successfully logged in: ${username}`);

    res.status(200).json({
      id: user.id,
      nickname: user.nickname,
      username: user.username,
      password: user.password,
      profileImg: user.profileImg,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

router.post("/user/login", loginUser);
const PORT = 5000;
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
