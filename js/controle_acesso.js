(function () {
  const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  function lerToken() {
    const t = localStorage.getItem('JWT');
    if (!t) return null;
    try { return JSON.parse(atob(t.replace('Bearer ', '').split('.')[1])); }
    catch { return null; }
  }

  function tokenValido() {
    const p = lerToken();
    if (!p) return false;
    if (p.exp && Date.now() >= p.exp * 1000) return false;
    return true;
  }

  function ehAdmin() {
    const p = lerToken();
    return !!(p && p[ROLE_CLAIM] === 'Admin');
  }

  function aplicar() {
    if (!tokenValido()) {
      localStorage.removeItem('JWT');
      window.location.replace('login.html');
      return;
    }

    if (ehAdmin()) return;

    const seletores = [
      'a[href="logs.html"]',
      'a[href="usuarios.html"]',
      'a[href="log_produto.html"]',
      'a[href="log_cliente.html"]',
      'a[href="log_fornecedor.html"]',
      'a[href="log_vendedor.html"]',
      'a[href="log_servico.html"]',
      'a[href="log_venda.html"]',
      'a[href="log_entrada_estoque.html"]'
    ];

    document.querySelectorAll(seletores.join(',')).forEach(link => {
      const item = link.closest('li') || link;
      item.style.display = 'none';
    });

    const seletoresAdminOnly = [
      '[data-admin-only]',
      '#botao-mostar-div-vendedores-com-maior-faturamento-por-periodo',
      '.botao-gerar-relatorio-vendedores-com-maior-faturamento'
    ];

    document.querySelectorAll(seletoresAdminOnly.join(',')).forEach(el => {
      el.style.display = 'none';
    });

    const paginasRestritas = ['logs.html', 'usuarios.html', 'log_produto.html',
      'log_cliente.html', 'log_fornecedor.html', 'log_vendedor.html',
      'log_servico.html', 'log_venda.html', 'log_entrada_estoque.html'];

    const paginaAtual = window.location.pathname.split('/').pop();
    if (paginasRestritas.includes(paginaAtual)) {
      document.body.innerHTML = `
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;text-align:center;padding:24px;">
          <div style="font-size:48px;">&#128274;</div>
          <h2 style="margin:16px 0 8px;">Acesso restrito</h2>
          <p style="color:#666;margin-bottom:20px;">Esta página é exclusiva para administradores.</p>
          <a href="home.html" style="background:#0d6efd;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Voltar para a Home</a>
        </div>`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicar);
  } else {
    aplicar();
  }
})();