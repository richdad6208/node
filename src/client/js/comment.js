const form = document.querySelector(".video__comment");
const textarea = form.querySelector("textarea");
const videoPlay = document.querySelector(".video__play");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = textarea.value;
  const videoId = videoPlay.dataset.id;
  console.log("comment.js", text);
  if (text === "") {
    return;
  }
  await fetch(`/api/video/${videoId}/comment`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      text,
    }),
  });
  textarea.value = "";
  // window.location.reload();
});
