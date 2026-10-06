// ===== MENU RESPONSIVO =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fecha o menu ao clicar em um link (útil no mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== DESTAQUE DE PLANO SELECIONADO =====
const planCards = document.querySelectorAll('.plan-card');
const planButtons = document.querySelectorAll('.btn-plan');

planButtons.forEach(button => {
    button.addEventListener('click', () => {
        planCards.forEach(card => card.classList.remove('selected'));
        const card = button.closest('.plan-card');
        card.classList.add('selected');

        const planName = card.querySelector('h3').textContent;
        button.textContent = 'Plano Selecionado ✓';

        setTimeout(() => {
            button.textContent = 'Escolher Plano';
        }, 2000);

        // Rola até o formulário de contato para o usuário prosseguir
        document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function mostrarErro(campo, mensagem) {
    campo.classList.add('invalid');
    const erroSpan = document.getElementById('erro' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
    if (erroSpan) erroSpan.textContent = mensagem;
}

function limparErro(campo) {
    campo.classList.remove('invalid');
    const erroSpan = document.getElementById('erro' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
    if (erroSpan) erroSpan.textContent = '';
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.remove('show');

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');

    let valido = true;

    if (nome.value.trim().length < 3) {
        mostrarErro(nome, 'Digite seu nome completo.');
        valido = false;
    } else {
        limparErro(nome);
    }

    if (!validarEmail(email.value.trim())) {
        mostrarErro(email, 'Digite um e-mail válido.');
        valido = false;
    } else {
        limparErro(email);
    }

    if (assunto.value.trim().length < 3) {
        mostrarErro(assunto, 'Digite o assunto da mensagem.');
        valido = false;
    } else {
        limparErro(assunto);
    }

    if (mensagem.value.trim().length < 10) {
        mostrarErro(mensagem, 'Sua mensagem deve ter pelo menos 10 caracteres.');
        valido = false;
    } else {
        limparErro(mensagem);
    }

    if (valido) {
        // Front-end apenas: não há envio real ao servidor (conforme RF07)
        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
});

// ===== HEADER COM SOMBRA AO ROLAR + BOTÃO VOLTAR AO TOPO =====
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
        header.style.boxShadow = 'none';
    }

    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== DESTAQUE DO LINK ATIVO NO MENU CONFORME A ROLAGEM =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let atual = '';

    sections.forEach(section => {
        const topo = section.offsetTop - 100;
        if (window.scrollY >= topo) {
            atual = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + atual) {
            link.classList.add('active-link');
        }
    });
});