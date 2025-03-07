class VectorTrainer {
    constructor() {
        this.userInput = document.querySelector('#userInput');
        this.sendButton = document.querySelector('#sendMessage');
        this.chatMessages = document.querySelector('.chat-messages');
        
        // API ключ OpenAI (в реальном приложении должен храниться безопасно)
        
        
        // История диалога
        this.messageHistory = [];
        
        // Системный промпт для роли КЛИЕНТА
        this.clientPrompt = {
            role: "system",
            content: `Вы - потенциальный клиент автошколы . 
            
            Ваша роль - ВСЕГДА отвечать как КЛИЕНТ на реплики менеджера.
            Менеджер будет вести диалог по следующему скрипту:

            1. На ПРИВЕТСТВИЕ менеджера:
            - Здоровайтесь в ответ
            - Проявляйте интерес к обучению в автошколе

            2. На вопросы о ВАШИХ ДАННЫХ:
            - Представьтесь случайным именем
            - Назовите один из городов: Омск, Челябинск или Красноярск
            - Сообщите что хотите учиться на категорию B

            3. На ПРЕЗЕНТАЦИЮ автошколы:
            - Спрашивайте о стоимости обучения
            - Уточняйте про формат занятий (онлайн/офлайн)
            - Интересуйтесь автомобилями для обучения
            - Задавайте вопросы о включенных услугах

            4. На обсуждение ВАЖНЫХ МОМЕНТОВ:
            - Уточняйте сроки обучения
            - Спрашивайте про расписание групп
            - Интересуйтесь способами записи
            - Уточняйте про время занятий

            ВАЖНО: 
            - Вы ВСЕГДА отвечаете как КЛИЕНТ
            - Используйте короткие, естественные ответы
            - Иногда высказывайте сомнения по цене или срокам
            - Проявляйте интерес к акциям и скидкам
            - Ведите себя как реальный человек, который выбирает автошколу
            - Используй разные шаблоны ответов для каждого менеджера

            НИКОГДА не переходите в роль менеджера!`
        };
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
    }

    async handleSendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Добавляем сообщение менеджера в чат и историю
        this.addMessageToChat(message, 'user');
        this.messageHistory.push({ role: "user", content: message });
        this.userInput.value = '';
        
        this.showTypingIndicator();

        try {
            const response = await this.sendToGPT(message);
            this.hideTypingIndicator();
            
            // Добавляем ответ клиента в чат и историю
            this.addMessageToChat(response, 'bot');
            this.messageHistory.push({ role: "assistant", content: response });
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            this.hideTypingIndicator();
            this.addMessageToChat('Извините, произошла ошибка. Попробуйте позже.', 'bot');
        }
    }

    async sendToGPT(message) {
        try {
            // Используем CORS-прокси
            const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
            const OPENAI_API = 'https://api.openai.com/v1/chat/completions';
            
            const response = await fetch(CORS_PROXY + OPENAI_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
                    'Origin': window.location.origin
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        this.clientPrompt,
                        ...this.messageHistory,
                        { role: "user", content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Ошибка при отправке запроса к GPT:', error);
            throw error;
        }
    }

    addMessageToChat(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = '<div class="message-content">...</div>';
        this.chatMessages.appendChild(typingDiv);
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async closeDialog() {
        // Собираем весь диалог, включая системный промпт
        const fullDialog = [
            this.clientPrompt,  // Добавляем начальный системный промпт
            ...this.messageHistory  // Добавляем всю историю диалога
        ];
        
        // Промпт для анализа диалога
        const analysisPrompt = {
            role: "system",
            content: `Проанализируйте весь диалог менеджера с клиентом и верните ответ строго в формате JSON:
            {
                "metrics": {
                    "Работа по скрипту": число от 0 до 10,
                    "Знание продукта": число от 0 до 10,
                    "Присоединение к клиенту": число от 0 до 10,
                    "Выявление потребности": число от 0 до 10,
                    "Отработка возражений": число от 0 до 10,
                    "Закрытие сделки": число от 0 до 10
                },
                "analysis": {
                    "Работа по скрипту": "текст анализа",
                    "Знание продукта": "текст анализа",
                    "Присоединение к клиенту": "текст анализа",
                    "Выявление потребности": "текст анализа",
                    "Отработка возражений": "текст анализа",
                    "Закрытие сделки": "текст анализа"
                },
                "recommendations": ["рекомендация1", "рекомендация2", "рекомендация3"],
                "overallScore": число от 0 до 10
            }
            
            Оценивайте на основе следующих критериев:
            1. Работа по скрипту: насколько менеджер следует структуре скрипта продаж
            2. Знание продукта: точность информации об услугах автошколы
            3. Присоединение к клиенту: качество установления контакта
            4. Выявление потребности: эффективность вопросов для понимания потребностей клиента
            5. Отработка возражений: качество работы с сомнениями клиента
            6. Закрытие сделки: эффективность действий для завершения продажи`
        };

        try {
            // Отправляем запрос на анализ с полным контекстом диалога
            const response = await fetch(this.CORS_PROXY + 'https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
                    'Origin': window.location.origin
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        ...fullDialog,  // Весь предыдущий диалог
                        analysisPrompt, // Промпт для анализа
                        { 
                            role: "user", 
                            content: "Проанализируй весь диалог выше и дай оценку в указанном формате JSON" 
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000  // Увеличиваем лимит токенов для полного анализа
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const analysisData = JSON.parse(data.choices[0].message.content);

            // Очищаем чат
            this.chatMessages.innerHTML = '';
            
            // Создаем элемент для графика
            const chartContainer = document.createElement('div');
            chartContainer.style.width = '100%';
            chartContainer.style.height = '400px';
            this.chatMessages.appendChild(chartContainer);

            // Создаем график с реальными данными
            new Chart(chartContainer.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: Object.keys(analysisData.metrics),
                    datasets: [{
                        label: 'Оценка',
                        data: Object.values(analysisData.metrics),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Анализ диалога',
                            color: '#FF0000',
                            font: {
                                size: 16
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });

            // Добавляем текстовый анализ
            const analysisDiv = document.createElement('div');
            analysisDiv.className = 'analysis-text';
            analysisDiv.innerHTML = `
                <h3>Анализ диалога (Общая оценка: ${analysisData.overallScore.toFixed(1)})</h3>
                ${Object.entries(analysisData.analysis).map(([key, value]) => `
                    <div class="analysis-item">
                        <h4>${key} (${analysisData.metrics[key].toFixed(1)}/10)</h4>
                        <p>${value}</p>
                    </div>
                `).join('')}
                
                <h3>Рекомендации по улучшению</h3>
                <ul>
                    ${analysisData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            `;
            this.chatMessages.appendChild(analysisDiv);

        } catch (error) {
            console.error('Ошибка при анализе диалога:', error);
            this.addMessageToChat('Произошла ошибка при анализе диалога. Пожалуйста, попробуйте еще раз.', 'system');
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.vectorTrainer = new VectorTrainer();
});