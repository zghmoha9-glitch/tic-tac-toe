const AI = document.getElementById("AI")
const friend = document.getElementById("human")
AI.onclick = function () {
    localStorage.setItem("isbot",JSON.stringify(true))
    window.location.href = "game.html";
}
friend.onclick = function () {
    localStorage.setItem("isbot",JSON.stringify(false))
    console.log(localStorage.getItem("isbot"))
    window.location.href = "game.html";
}
