const form = document.querySelector(".video__comment");
const textarea = form.querySelector("textarea");
const videoPlay = document.querySelector(".video__play");
const text = textarea.value;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const videoId = videoPlay.dataset.id;
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
  });
});
