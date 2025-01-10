document.addEventListener('DOMContentLoaded', () => {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    
    const dates = Array.from({length: 14}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (13 - i));
        return `${date.getDate()}.${date.getMonth() + 1}`;
    });

    const contractsData = [
        2, 1, 3, 5, 4, 3, 3, 5, 4, 5, 3, 3, 2, 2
    ];

    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Количество договоров',
                data: contractsData,
                borderColor: '#1E3B6C',
                backgroundColor: 'rgba(43, 125, 225, 0.15)',
                fill: true,
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#1E3B6C',
                pointBorderColor: '#1E3B6C',
                pointBorderWidth: 1.5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#1E3B6C',
                pointHoverBorderColor: '#FFFFFF',
                pointHoverBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            layout: {
                padding: {
                    left: 50,
                    right: 20,
                    top: 20,
                    bottom: 60
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: -0.5,
                    suggestedMax: 6,
                    ticks: {
                        stepSize: 1,
                        padding: 15,
                        callback: function(value) {
                            if (value >= 0) {
                                return value + ' дог.';
                            }
                        },
                        font: {
                            size: 11
                        },
                        color: '#1E3B6C'
                    },
                    grid: {
                        color: 'rgba(43, 125, 225, 0.1)',
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                        },
                        color: 'var(--accent-blue)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 12,
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                            weight: '500'
                        },
                        usePointStyle: true,
                        padding: 15,
                        color: '#333'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#333',
                    bodyColor: '#333',
                    titleFont: {
                        size: 12,
                        weight: '600',
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                    },
                    bodyFont: {
                        size: 11,
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                    },
                    padding: 10,
                    displayColors: false,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `Договоров: ${context.raw}`;
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'nearest'
            },
            elements: {
                line: {
                    capBezierPoints: true
                }
            }
        }
    });

    salesCtx.canvas.style.height = '250px';
    // Инициализация графика сравнительного анализа
    const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
    const comparisonChart = new Chart(comparisonCtx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [
                {
                    label: 'Текущий период',
                    data: [33, 35, 38, 34, 37, 39],
                    borderColor: 'var(--primary-color)',
                    backgroundColor: 'rgba(30, 59, 108, 0.1)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 2,
                },
                {
                    label: 'Предыдущий период',
                    data: [31, 34, 36, 32, 35, 37],
                    borderColor: 'var(--accent-blue)',
                    backgroundColor: 'rgba(43, 125, 225, 0.1)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 2,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 20,
                    suggestedMax: 30,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
});

function showAnalysis(url) {
    const modal = document.getElementById('analysisModal');
    const iframe = document.getElementById('analysisFrame');
    const closeBtn = modal.querySelector('.close');

    iframe.src = url;
    modal.style.display = 'block';

    // Закрытие по клику на крестик
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        iframe.src = '';
    }

    // Закрытие по клику вне модального окна
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    }
}

function showTranscript(url) {
    const modal = document.getElementById('transcriptModal');
    const iframe = document.getElementById('transcriptFrame');
    const closeBtn = modal.querySelector('.close');

    iframe.src = url;
    modal.style.display = 'block';

    // Закрытие по клику на крестик
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        iframe.src = '';
    }

    // Закрытие по клику вне модального окна
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    }
}

function playAudio(url) {
    const modal = document.getElementById('audioModal');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const closeBtn = modal.querySelector('.close');

    audioSource.src = url;
    audioPlayer.load();
    modal.style.display = 'block';

    // Закрытие по клику на крестик
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        audioPlayer.pause();
    }

    // Закрытие по клику вне модального окна
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            audioPlayer.pause();
        }
    }
}

