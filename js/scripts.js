document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('mouseover', () => {
        // Make sure all items are gray before hovering
        document.querySelectorAll('.nav-links li').forEach(i => i.classList.add('inactive'));
        item.classList.remove('inactive');
    });

    item.addEventListener('mouseout', () => {
        // Reset all items to white when no hover
        document.querySelectorAll('.nav-links li').forEach(i => i.classList.remove('inactive'));
    });
});
