// Countdown Timer - Versão Simplificada
// Este script deve ser incluído apenas no index.html

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando countdown...');
    // Data do casamento: 07 de Fevereiro de 2026 às 11:00
    const weddingDate = new Date('2026-02-07T17:00:00').getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        // Verificar se os elementos existem
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('Elementos do countdown não encontrados');
            return;
        }
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // O casamento já aconteceu
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.innerHTML = '<div class="countdown-finished"><h3>O grande dia chegou!</h3><p>🎉 Parabéns aos noivos! 🎉</p></div>';
            }
        }
    }
    // Executar imediatamente
    updateCountdown();
    // Atualizar a cada segundo
    setInterval(updateCountdown, 1000);
});
