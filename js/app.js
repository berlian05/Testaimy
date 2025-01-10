document.addEventListener('DOMContentLoaded', () => {
    const dates = Array.from({length: 14}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (13 - i));
        return `${date.getDate()}.${date.getMonth() + 1}`;
    });

    // Общие настройки для всех графиков
    const chartConfig = {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3,
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 20,
                    bottom: 10
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    };

    // График продаж
    const salesChart = new Chart(document.getElementById('salesChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Количество договоров',
                data: [2, 1, 3, 5, 4, 3, 3, 5, 4, 5, 3, 3, 2, 2],
                borderColor: '#1E3B6C',
                backgroundColor: 'rgba(30, 59, 108, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#1E3B6C',
                pointBorderColor: '#1E3B6C',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3.5,
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 6,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return value + ' дог.';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });

    // График звонков
    const callsChart = new Chart(document.getElementById('callsChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'],
            datasets: [
                {
                    label: 'Текущий период',
                    data: [280, 290, 310, 295, 320, 315, 325],
                    borderColor: '#4DD0E1',
                    backgroundColor: 'rgba(77, 208, 225, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                },
                {
                    label: 'Предыдущий период',
                    data: [260, 270, 290, 275, 300, 295, 305],
                    borderColor: '#FF6B8A',
                    backgroundColor: 'rgba(255, 107, 138, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3.5,
            scales: {
                y: {
                    min: 200,
                    max: 400,
                    ticks: {
                        stepSize: 20,
                        callback: value => value + ' зв.'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });

    // График конверсии
    const conversionChart = new Chart(document.getElementById('conversionChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'],
            datasets: [
                {
                    label: 'Текущий период',
                    data: [32, 33, 34, 36, 35, 36, 38],
                    borderColor: '#4DD0E1',
                    backgroundColor: 'rgba(77, 208, 225, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                },
                {
                    label: 'Предыдущий период',
                    data: [30, 31, 32, 33, 32, 34, 35],
                    borderColor: '#FF6B8A',
                    backgroundColor: 'rgba(255, 107, 138, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3.5,
            scales: {
                y: {
                    min: 25,
                    max: 40,
                    ticks: {
                        stepSize: 5,
                        callback: value => value + '%'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });

    // График активности
    const activityChart = new Chart(document.getElementById('activityChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'],
            datasets: [
                {
                    label: 'Текущий период',
                    data: [75, 76, 78, 77, 79, 78, 80],
                    borderColor: '#4DD0E1',
                    backgroundColor: 'rgba(77, 208, 225, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                },
                {
                    label: 'Предыдущий период',
                    data: [70, 72, 73, 74, 75, 76, 77],
                    borderColor: '#FF6B8A',
                    backgroundColor: 'rgba(255, 107, 138, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3.5,
            scales: {
                y: {
                    min: 60,
                    max: 90,
                    ticks: {
                        stepSize: 10,
                        callback: value => value + '%'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });

    // Функция переключения графиков
    function switchChart(chartId) {
        document.querySelectorAll('.chart-container').forEach(container => {
            container.classList.remove('active');
        });
        
        const selectedChart = document.querySelector(`#${chartId}Container`);
        if (selectedChart) {
            selectedChart.classList.add('active');
        }

        document.querySelectorAll('.kpi-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.chart === chartId) {
                card.classList.add('active');
            }
        });
    }

    // Обработчики событий
    document.querySelectorAll('.kpi-card').forEach(card => {
        card.addEventListener('click', () => {
            const chartId = card.dataset.chart;
            switchChart(chartId);
        });
    });

    // Показываем первый график по умолчанию
    switchChart('salesChart');
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

function showTranscriptWithAudio(audioUrl, transcriptUrl) {
    // Показываем и настраиваем аудио плеер
    const audioContainer = document.getElementById('audioPlayerContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    
    audioSource.src = audioUrl;
    audioPlayer.load();
    
    // Показываем транскрипцию
    const modal = document.getElementById('transcriptModal');
    const iframe = document.getElementById('transcriptFrame');
    const closeBtn = modal.querySelector('.close');
    
    iframe.src = transcriptUrl;
    modal.style.display = 'block';
    modal.classList.add('transcript-modal');
    
    // Показываем аудио плеер после открытия модального окна
    setTimeout(() => {
        audioContainer.classList.add('visible');
    }, 100);

    // Закрытие по клику на крестик
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        modal.classList.remove('transcript-modal');
        audioContainer.classList.remove('visible');
        audioPlayer.pause();
        iframe.src = '';
    }

    // Закрытие по клику вне модального окна
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            modal.classList.remove('transcript-modal');
            audioContainer.classList.remove('visible');
            audioPlayer.pause();
            iframe.src = '';
        }
    }
}

