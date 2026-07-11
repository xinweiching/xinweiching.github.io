document.addEventListener('DOMContentLoaded', () => {
    let categoryFilter = 'all';
    let difficultyFilter = 'all';

    function filterReadings() {
        document.querySelectorAll('.reading-card').forEach(card => {
            const catMatch = categoryFilter === 'all' || card.dataset.category === categoryFilter;
            const diffMatch = difficultyFilter === 'all' ||
                (card.dataset.difficulty || '').split(' ').includes(difficultyFilter);
            card.style.display = (catMatch && diffMatch) ? 'block' : 'none';
        });
    }

    document.querySelectorAll('.reading-filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.reading-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            categoryFilter = this.getAttribute('data-filter');
            filterReadings();
        });
    });

    document.querySelectorAll('.reading-difficulty-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.reading-difficulty-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            difficultyFilter = this.getAttribute('data-difficulty');
            filterReadings();
        });
    });

    filterReadings();

    document.querySelectorAll('.reading-card__toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.reading-card');
            const expanded = card.classList.toggle('expanded');
            this.textContent = expanded ? 'Show less ▴' : 'Show more ▾';
            this.setAttribute('aria-expanded', expanded);
        });
    });
});
