document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Engineering project filter
    filterEngineeringProjects('all');

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterEngineeringProjects(this.getAttribute('data-filter'));
        });
    });

    function filterEngineeringProjects(selectedCategory) {
        document.querySelectorAll('#engineering .project-item').forEach(item => {
            if (selectedCategory === 'all' || item.classList.contains(selectedCategory)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
});
