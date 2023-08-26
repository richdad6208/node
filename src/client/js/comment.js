const formBtn = document.querySelector(".video__comment button");
const form = document.querySelector(".video__comment");
const textarea = form.querySelector("textarea");
const videoPlay = document.querySelector(".video__play");
const delBtn = document.querySelectorAll(".video__comment__delete");
const commentList = document.querySelector(".video__comment__list");
function fakeComment(text) {
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
function checkText(text) {
  if (!text) {
    alert("댓글을 입력해주세요");
  }
}
function removeComment() {
  console.log("hi");
  if (!commentList.children.length) {
    const li = document.createElement("li");
    li.clssName = "noComment";
    li.innerText = "댓글이 없습니다";
    commentList.appendChild(li);
  } else {
    const noComment = commentList.querySelector(".noComment");
    if (noComment) {
      commentList.remove(noComment);
    }
  }
}

commentList.addEventListener("click", async (e) => {
  if (e.target.className === "video__comment__delete") {
    const delBtn = e.target;
    const commentId = delBtn.dataset.commentId;
    const userId = delBtn.dataset.userId;
    try {
      await fetch(`/api/video/${userId}/${commentId}/delete`, {
        method: "DELETE",
      });
      delBtn.parentElement.parentElement.removeChild(delBtn.parentElement);
      removeComment();
    } catch (err) {
      console.log(err);
    }
  }
});

formBtn.addEventListener("click", async (e) => {
  removeComment();
  e.preventDefault();
  const text = textarea.value;
  checkText(text);
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
