const btns = document.querySelectorAll(".input-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", handleBtnClick);
});

function handleBtnClick(e) {
  console.log(e.target.textContent);
}
