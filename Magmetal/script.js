const lista = document.getElementById("lista");

function mostrar(valor) {
  return valor ? valor : "Não informado";
}
function linkWhatsapp(numero) {
  if (!numero) return "Não informado";
  const digitos = numero.replace(/\D/g, "");
  return `<a href="https://wa.me/554199506690" target="_blank">${numero}</a>`;
}
function linkEmail(email) {
  if (!email) return "Não informado";
  return `<a href="mailto:${email}">${email}</a>`;
}
function textoSeis(t) {
  if (t.transporta6m === "sim") return "Sim";
  if (t.transporta6m === "nao") return "Não";
  return "A confirmar";
}

function desenharLimites(t) {
  if (t.limitesPorRegiao.length === 0) return "";
  const itens = t.limitesPorRegiao.map(function (l) {
    return `${l.regiao}: máx. ${l.comprimentoMaximoMetros} m`;
  });
  return `<p><strong>Exceções:</strong> ${itens.join("; ")}</p>`;
}

function desenharContato(titulo, c) {
  return `
    <div class="contato">
      <h3>${titulo}</h3>
      <p>Telefone: ${mostrar(c.telefone)}</p>
          <p>WhatsApp: ${linkWhatsapp(c.whatsapp)}</p>
            <p>E-mail: ${linkEmail(c.email)}</p>
    </div>
  `;
}

function desenharCartao(t) {
  return `
    <div class="cartao">
      <h2>${t.nome}</h2>
      <p><strong>Regiões:</strong> ${t.regioes.join(", ")}</p>
      <p><strong>Transporta 6 m:</strong> ${textoSeis(t)}</p>
      ${desenharLimites(t)}
      <div class="contatos">
        ${desenharContato("Expedição", t.contatos.expedicao)}
        ${desenharContato("Financeiro", t.contatos.financeiro)}
        ${desenharContato("Comercial", t.contatos.comercial)}
        
      </div>
    </div>
  `;
}

const campoBusca = document.getElementById("busca");

function mostrarLista(texto) {
  const termo = texto.toLowerCase().trim();

  const filtradas = transportadoras.filter(function (t) {
    const alvo = (t.nome + " " + t.regioes.join(" ")).toLowerCase();
    return alvo.includes(termo);
  });

  if (filtradas.length === 0) {
    lista.innerHTML = "<p>Nenhuma transportadora encontrada.</p>";
    return;
  }

  lista.innerHTML = filtradas.map(desenharCartao).join("");
}

campoBusca.addEventListener("input", function () {
  mostrarLista(campoBusca.value);
});

mostrarLista("");