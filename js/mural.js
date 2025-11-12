// Mural de Recados - Visualização de mensagens
class MuralDeRecados {
    constructor() {
        this.currentPage = 1;
        this.perPage = 10;
        this.isLoading = false;
        this.hasMoreMessages = true;
        this.baseUrl = apiConfig.buildUrl('/api/collections/mensagens/records');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMessages();
    }

    setupEventListeners() {
        const carregarMaisBtn = document.getElementById('carregarMais');

        if (carregarMaisBtn) {
            carregarMaisBtn.addEventListener('click', () => this.loadMoreMessages());
        }
    }



    async loadMessages() {
        try {
            this.isLoading = true;
            
            const url = new URL(this.baseUrl);
            url.searchParams.append('page', this.currentPage);
            url.searchParams.append('perPage', this.perPage);
            url.searchParams.append('sort', '-created'); // Mais recentes primeiro

            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                
                if (this.currentPage === 1) {
                    this.renderMessages(data.items);
                } else {
                    this.appendMessages(data.items);
                }
                
                // Verifica se há mais mensagens
                this.hasMoreMessages = data.items.length === this.perPage && data.page < data.totalPages;
                this.updateLoadMoreButton();
                this.updateMessageCount(data.totalItems);
                
            } else {
                throw new Error('Erro ao carregar mensagens');
            }
        } catch (error) {
            console.error('Erro:', error);
            this.showLoadingError();
        } finally {
            this.isLoading = false;
        }
    }

    async loadMoreMessages() {
        this.currentPage++;
        await this.loadMessages();
    }

    renderMessages(messages) {
        const container = document.getElementById('mensagensList');
        
        if (!container) return;

        if (messages.length === 0) {
            container.innerHTML = `
                <div class="mural-empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                    </svg>
                    <h3>Nenhuma mensagem ainda</h3>
                    <p>As mensagens carinhosas dos convidados aparecerão aqui quando eles confirmarem presença!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = messages.map(msg => this.createMessageCard(msg)).join('');
    }

    appendMessages(messages) {
        const container = document.getElementById('mensagensList');
        if (!container || messages.length === 0) return;

        const messagesHtml = messages.map(msg => this.createMessageCard(msg)).join('');
        container.insertAdjacentHTML('beforeend', messagesHtml);
    }



    createMessageCard(message) {
        const date = new Date(message.created);
        const formattedDate = this.formatDate(date);
        
        // Sanitiza o texto para prevenir XSS
        const safeName = this.escapeHtml(message.nome || 'Anônimo');
        const safeMessage = this.escapeHtml(message.message || '');

        return `
            <div class="mensagem-card">
                <div class="mensagem-header">
                    <div class="mensagem-nome">${safeName}</div>
                    <div class="mensagem-data">${formattedDate}</div>
                </div>
                <div class="mensagem-texto">${safeMessage}</div>
            </div>
        `;
    }

    formatDate(date) {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        
        // Se foi hoje
        if (diff < 24 * 60 * 60 * 1000 && now.getDate() === date.getDate()) {
            return `hoje às ${date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        }
        
        // Se foi ontem
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday.getDate() === date.getDate() && 
            yesterday.getMonth() === date.getMonth() && 
            yesterday.getFullYear() === date.getFullYear()) {
            return `ontem às ${date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })}`;
        }
        
        // Outros dias
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }



    updateLoadMoreButton() {
        const button = document.getElementById('carregarMais');
        if (!button) return;

        button.style.display = this.hasMoreMessages ? 'block' : 'none';
    }

    updateMessageCount(totalItems = null) {
        const countElement = document.getElementById('totalMensagens');
        if (!countElement) return;

        if (totalItems !== null) {
            countElement.textContent = totalItems;
        } else {
            // Conta as mensagens visíveis na página
            const messages = document.querySelectorAll('.mensagem-card');
            countElement.textContent = messages.length;
        }
    }



    showLoadingError() {
        const container = document.getElementById('mensagensList');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #f44336;">
                <p>Erro ao carregar mensagens. Tente recarregar a página.</p>
                <button onclick="window.location.reload()" style="
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #f44336;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Recarregar</button>
            </div>
        `;
    }
}

// Inicializa o mural quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new MuralDeRecados();
});