// Show all projects by default

document.addEventListener('DOMContentLoaded', () => {
    // Show all projects by default
    filterProjects('all');

    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Remove 'active' from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Add 'active' to clicked button
            this.classList.add('active');
            // Filter projects
            filterProjects(this.getAttribute('data-filter'));
        });
    });

    function filterProjects(selectedCategory) {
        const items = document.querySelectorAll('.project-item');
        if (selectedCategory === 'all') {
            items.forEach(item => {
                item.style.visibility = 'visible';
                item.style.position = 'relative';
            });
        } else {
            items.forEach(item => {
                if (item.classList.contains(selectedCategory)) {
                    item.style.visibility = 'visible';
                    item.style.position = 'relative';
                } else {
                    item.style.visibility = 'hidden';
                    item.style.position = 'absolute';
                }
            });
        }
    }
});
