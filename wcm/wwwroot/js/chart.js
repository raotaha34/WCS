document.addEventListener("DOMContentLoaded", function () {

    // Pie chart (only if data exists)
    if (typeof chartData !== "undefined") {
        initPieChart(
            chartData.open,
            chartData.inProgress,
            chartData.resolved
        );
    }

    // Bar chart
    initBarChart();
});


/* =========================
   PIE / DOUGHNUT CHART
========================= */
function initPieChart(open, inProgress, resolved) {
    const ctx = document.getElementById('issuesPieChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Open Issue', 'In Progress', 'Resolved'],
            datasets: [{
                data: [open, inProgress, resolved],
                backgroundColor: ['#F59E0B', '#F97316', '#10B981'],
                hoverBackgroundColor: ['#D97706', '#EA580C', '#059669'],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Poppins',
                            size: 12
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}


/* =========================
   BAR CHART
========================= */
function initBarChart() {
    const ctx = document.getElementById('complaintsBarChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Complaints',
                data: [8, 12, 6, 15, 10, 5],
                backgroundColor: '#6366F1',
                hoverBackgroundColor: '#4F46E5',
                borderRadius: 6,
                barThickness: 28
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#F3F4F6' },
                    ticks: {
                        font: { family: 'Poppins', size: 11 }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { family: 'Poppins', size: 11 }
                    }
                }
            }
        }
    });
}