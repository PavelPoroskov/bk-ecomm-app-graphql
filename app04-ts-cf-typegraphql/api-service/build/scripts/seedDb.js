import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getConfig } from '../src/config.js';
import { UserModel } from "../src/graphql-schema/resolvers/User.type.js";
import { PostModel } from "../src/graphql-schema/resolvers/Post.type.js";
const makeCreatePostList = (userOne) => {
    let i1 = 0;
    return (n) => Array.from({ length: n }, () => {
        i1 = i1 + 1;
        return {
            title: `Post ${i1} by ${userOne.name}`,
            content: `content: Post ${i1} by ${userOne.name}`,
            author: userOne._id,
        };
    });
};
async function seedDatabase() {
    const userOne = new UserModel({
        email: "user.one@github.com",
        name: "User One",
    });
    await userOne.save();
    const userTwo = new UserModel({
        email: "user.two@github.com",
        name: "User Two",
    });
    await userTwo.save();
    const createPostListByUserOne = makeCreatePostList(userOne);
    const createPostListByUserTwo = makeCreatePostList(userTwo);
    const waitSec = sec => new Promise(fnResolve => setTimeout(fnResolve, sec * 1000));
    await PostModel.create(createPostListByUserOne(1));
    await waitSec(3);
    await PostModel.create(createPostListByUserTwo(1));
    await waitSec(2);
    await PostModel.create(createPostListByUserOne(2));
    await waitSec(3);
    await PostModel.create(createPostListByUserTwo(2));
    await waitSec(2);
    await PostModel.create(createPostListByUserOne(3));
    await waitSec(3);
    await PostModel.create(createPostListByUserTwo(3));
    await waitSec(2);
    await PostModel.create(createPostListByUserOne(4));
    await waitSec(3);
    await PostModel.create(createPostListByUserTwo(4));
}
dotenv.config({ path: './.env' });
const CONFIG = getConfig();
const conn = await mongoose.connect(CONFIG.MONGODB_URI);
console.log(`MongoDB Connected: ${conn.connection.host}`);
await seedDatabase();
mongoose.connection.close();
console.log('seedDatabase finished');
