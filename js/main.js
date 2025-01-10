// Удалите или закомментируйте весь код
/*
function checkAuth() {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', checkAuth);
*/

// Добавьте в конец файла
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки анализа
    const analysisButtons = document.querySelectorAll('.call-analysis-btn');
    const modal = document.getElementById('dialogAnalysisModal');
    const closeBtn = modal.querySelector('.close');

    // Добавляем обработчики для каждой кнопки
    analysisButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Получаем ID звонка из data-атрибута или другим способом
            const callId = this.dataset.callId;
            showAnalysis(callId);
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // Функция показа анализа
    function showAnalysis(callId) {
        // Здесь можно добавить загрузку данных с сервера
        modal.style.display = "block";
        
        // Обновляем прогресс-бары
        document.getElementById('scriptProgress').style.width = "85%";
        document.getElementById('objectionsProgress').style.width = "75%";
        
        // Добавляем рекомендации
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = `
            <li>Улучшить работу с возражениями</li>
            <li>Следовать скрипту продаж более точно</li>
            <li>Улучшить выявление потребностей клиента</li>
        `;
    }

    // Находим все кнопки анализа и добавляем обработчики
    const buttons = document.querySelectorAll('.call-analysis-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filePath = this.dataset.filePath;
            console.log('Открываем файл:', filePath); // Для отладки
            
            try {
                window.open(filePath, '_blank');
            } catch (error) {
                console.error('Ошибка при открытии файла:', error);
            }
        });
    });
});