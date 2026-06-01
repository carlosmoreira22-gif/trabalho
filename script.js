const terminalBody = document.getElementById('terminalBody');
const userInput = document.getElementById('userInput');

// Dados fictícios/estatísticos simulados para as tabelas
const brasileiraoData = [
    { pos: 1, time: "Palmeiras", p: 72, j: 38, v: 21, e: 9, d: 8, classe: "zone-g4" },
    { pos: 2, time: "Grêmio", p: 68, j: 38, v: 21, e: 5, d: 12, classe: "zone-g4" },
    { pos: 3, time: "Atlético-MG", p: 66, j: 38, v: 19, e: 9, d: 10, classe: "zone-g4" },
    { pos: 4, time: "Flamengo", p: 66, j: 38, v: 19, e: 9, d: 10, classe: "zone-g4" },
    { pos: 5, time: "Botafogo", p: 64, j: 38, v: 18, e: 10, d: 10, classe: "zone-lib" },
    { pos: 6, time: "Bragantino", p: 62, j: 38, v: 17, e: 11, d: 10, classe: "zone-lib" },
    { pos: 17, time: "Santos", p: 43, j: 38, v: 11, e: 10, d: 17, classe: "zone-z4" }
];

const libertadoresData = [
    { grupo: "Grupo A", times: ["Fluminense (BRA)", "Colo-Colo (CHI)", "Cerro Porteño (PAR)", "Alianza Lima (PER)"] },
    { grupo: "Grupo B", times: ["São Paulo (BRA)", "Talleres (ARG)", "Barcelona (ECU)", "Cobresal (CHI)"] },
    { grupo: "Grupo C", times: ["Grêmio (BRA)", "Huachipato (CHI)", "The Strongest (BOL)", "Estudiantes (ARG)"] },
    { grupo: "Grupo D", times: ["Botafogo (BRA)", "Junior Barranquilla (COL)", "LDU (ECU)", "Universitario (PER)"] }
];

function appendText(text, isUser = false, isHighlight = false) {
    const element = document.createElement('p');
    element.innerHTML = text;
    
    if (isUser) {
        element.className = 'user-text';
    } else if (isHighlight) {
        element.className = 'highlight-text';
    } else {
        element.className = 'system-text';
    }
    
    terminalBody.appendChild(element);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Gera a tabela HTML do Brasileirão dinamicamente
function showBrasileirao() {
    appendText("<br><span class='highlight-text'>=== TABELA DO BRASILEIRÃO (Destaques) ===</span>");
    
    let tableHtml = `<table class="football-table">
        <thead>
            <tr>
                <th>Pos</th>
                <th>Clube</th>
                <th>P</th>
                <th>J</th>
                <th>V</th>
                <th>E</th>
                <th>D</th>
            </tr>
        </thead>
        <tbody>`;
        
    brasileiraoData.forEach(t => {
        tableHtml += `<tr class="${t.classe}">
            <td>${t.pos}º</td>
            <td><strong>${t.time}</strong></td>
            <td>${t.p}</td>
            <td>${t.j}</td>
            <td>${t.v}</td>
            <td>${t.e}</td>
            <td>${t.d}</td>
        </tr>`;
    });
    
    tableHtml += `</tbody></table>`;
    
    const div = document.createElement('div');
    div.innerHTML = tableHtml;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Mostra os grupos estruturados da libertadores
function showLibertadores() {
    appendText("<br><span class='highlight-text'>=== GRUPOS DA COPA LIBERTADORES ===</span>");
    
    libertadoresData.forEach(g => {
        let groupHtml = `<p class="highlight-text" style="margin-top:8px;">• ${g.grupo}</p><ul>`;
        g.times.forEach((time, index) => {
            groupHtml += `<li style="margin-left: 20px; color: #e5e7eb;">${index + 1}. ${time}</li>`;
        });
        groupHtml += `</ul>`;
        
        const div = document.createElement('div');
        div.innerHTML = groupHtml;
        terminalBody.appendChild(div);
    });
    
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function showMenu() {
    appendText("<br>⚽ Digite o comando ou número desejado:");
    appendText("<span class='highlight-text'>[1]</span> Ver Tabela do Brasileirão");
    appendText("<span class='highlight-text'>[2]</span> Ver Grupos da Libertadores");
    appendText("<span class='highlight-text'>[3]</span> Como fazer o Deploy no GitHub Pages");
    appendText("💡 Digite <span class='highlight-text'>'limpar'</span> para limpar a tela do terminal.");
}

function initTerminal() {
    appendText("⚽ BEM-VINDO AO FUT-ANALYTICS INTERACTIVE TERMINAL ⚽");
    appendText("Pronto para deploy via GitHub Pages.");
    showMenu();
}

userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = userInput.value.trim().toLowerCase();
        if (command === "") return;

        appendText(`⚽ $ ${userInput.value}`, true);
        userInput.value = "";

        switch(command) {
            case '1':
                showBrasileirao();
                setTimeout(showMenu, 1200);
                break;
            case '2':
                showLibertadores();
                setTimeout(showMenu, 1200);
                break;
            case '3':
                appendText("<br><span class='highlight-text'>🚀 PASSO A PASSO GITHUB PAGES:</span>");
                appendText("1. Crie um repositório público no seu GitHub (ex: meu-site-futebol).");
                appendText("2. Faça o upload desses 3 arquivos exatamente com estes nomes.");
                appendText("3. No GitHub, vá em <strong>Settings</strong> (Configurações) > <strong>Pages</strong> (menu esquerdo).");
                appendText("4. Em 'Build and deployment', selecione a branch <strong>main</strong> (ou master) e a pasta <strong>/ (root)</strong>.");
                appendText("5. Clique em <strong>Save</strong>. Em 1 minuto seu site estará online no link fornecido!");
                setTimeout(showMenu, 1500);
                break;
            case 'limpar':
                terminalBody.innerHTML = "";
                showMenu();
                break;
            default:
                appendText("❌ Opção inválida. Digite 1, 2, 3 ou 'limpar'.", false);
                break;
        }
    }
});

// Inicializa o app
initTerminal();
