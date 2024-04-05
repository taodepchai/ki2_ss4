import { createPost, displayAllPosts, searchPost } from "./managerPost.js";

let post1 = {
  title: "bai 1",
  content: "noi dung bai viet so 1",
  author: "tac gia 2 1",
};

let post2 = {
  title: "bai 2",
  content: "noi dung bai viet so 2",
  author: "tac gia 2 2",
};

createPost(post1);
createPost(post2);

console.log("danh sach cac bai viet:");
displayAllPosts();

let keyword = "1";
console.log(`ket qua tim kiem cho tu khoa "${keyword}":`);
searchPost(keyword);
