const formBtn = document.querySelector(".video__comment button");
const form = document.querySelector(".video__comment");
const textarea = form.querySelector("textarea");
const videoPlay = document.querySelector(".video__play");
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = textarea.value;
  const videoId = videoPlay.dataset.id;
  console.log("comment.js", text);
  if (text === "") {
    return;
  }
  fetch(`/api/video/${videoId}/comment`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      text,
    }),
  })
    .then(() => {
      textarea.value = "";
      window.location.reload();
    })
    .catch((err) => console.log(err));
});
