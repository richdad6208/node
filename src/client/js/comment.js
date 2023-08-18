const form = document.querySelector(".video__comment");
const textarea = form.querySelector("textarea");
const videoPlay = document.querySelector(".video__play");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const videoId = videoPlay.dataset.id;
  console.log("hi");
  fetch(`/api/video/${videoId}/comment`, {
    method: "POST",
    body: {
      text: textarea.value,
    },
  });
});
