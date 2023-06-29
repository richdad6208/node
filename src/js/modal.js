const modalOpen = document.querySelector(".modalButton");
const modalDeleteVideo = document.querySelector(".modalDeleteVideo");
const modalOk = document.querySelector(".modalOk");
const modalNo = document.querySelector(".modalNo");
modalOpen.addEventListener("click", () => {
  modalDeleteVideo.showModal();
});

modalOk.addEventListener("click", () => {
  modalDeleteVideo.close();
});
modalNo.addEventListener("click", () => {
  modalDeleteVideo.close();
});
