async function refreshTrendingVideos() {
    let el = this.event.target;
    el.disabled = true;
    el.textContent = 'Loading...';
    const response = await fetch('/videos/refresh', {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow'
    });
    el.disabled = false;
    window.location.reload();
}