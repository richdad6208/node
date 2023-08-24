const formBtn = document.querySelector(".video__comment button");
const form = document.querySelector(".video__comment");
const textarea = form.querySelector("textarea");
const videoPlay = document.querySelector(".video__play");
const delBtn = document.querySelector(".video__comment__delete");

function fakeComment(text) {
  const commentList = document.querySelector(".video__comment__list");
  const newCommentItem = document.createElement("li");
  const newCommentText = document.createElement("span");
  const newCommentDelBtn = document.createElement("a");
  newCommentItem.className = "video__comment__item";
  newCommentItem.appendChild(newCommentText);
  newCommentItem.appendChild(newCommentDelBtn);
  newCommentDelBtn.className = "video__comment__delete";
  newCommentText.innerText = text;
  newCommentDelBtn.innerText = "❌";
  commentList.prepend(newCommentItem);
}

delBtn.addEventListener("click", async () => {
  const commentId = delBtn.dataset.commentId;
  const userId = delBtn.dataset.userId;
  try {
    await fetch(`/user/${userId}/${commentId}/delete`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
});

formBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const text = textarea.value;
  const videoId = videoPlay.dataset.id;
  if (text === "") {
    return;
  }
  try {
    await fetch(`/api/video/${videoId}/comment`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    });
    fakeComment(text);
    textarea.value = "";
  } catch (err) {
    console.log(err);
  }
});
