const formBtn = document.querySelector(".video__comment button");
const form = document.querySelector(".video__comment");
const textarea = form.querySelector("textarea");
const videoPlay = document.querySelector(".video__play");

function fakeComment(text) {
  const commentList = document.querySelector(".video__comment__list");
  const newCommentItem = document.createElement("li");
  newCommentItem.className = "video__comment__item";
  newCommentItem.innerText = text;
  commentList.prepend(newCommentItem);
}

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
