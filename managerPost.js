let listPost = [];

const MAXPOST = 5;

const post = {
  title: "",
  content: "",
  author: "",
};

function createPost(newPost) {
  if (listPost.length >= MAXPOST) {
    console.log("danh sach bai viet da day");
    return;
  }
  listPost = [...listPost, newPost];
}

function displayAllPosts() {
  for (const post of listPost) {
    console.log("tieu de:", post.title);
    console.log("noi dung:", post.content);
    console.log("tac gia:", post.author);
  }
}

function searchPost(keyword) {
  const result = listPost.filter(
    (post) =>
      post.title.includes(keyword) ||
      post.content.includes(keyword) ||
      post.author.includes(keyword)
  );
  if (result.length === 0) {
    console.log("khong tim thay bai viet nao phu hop");
  } else {
    console.log("ket qua tim kiem:");
    displayAllPosts(result);
  }
}

export { createPost, displayAllPosts, searchPost };
