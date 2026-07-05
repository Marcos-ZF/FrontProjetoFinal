function mostrarAviso(mensagem, tipo) {
  const sucesso = tipo === "sucesso" || tipo === "success";
  let el = document.getElementById("aviso-padrao");
  if (!el) {
    el = document.createElement("div");
    el.id = "aviso-padrao";
    el.setAttribute("role", "alert");
    document.body.appendChild(el);
  }
  el.className = `alert ${sucesso ? "alert-success" : "alert-danger"} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
  el.style.zIndex = "3000";
  el.textContent = mensagem;
  clearTimeout(el._timerAviso);
  el._timerAviso = setTimeout(() => { el.className = ""; el.textContent = ""; }, 4000);
}
window.mostrarAviso = mostrarAviso;
