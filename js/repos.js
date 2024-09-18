document.addEventListener('DOMContentLoaded', () => {
    const username = 'om3ga6400';
    const container = document.getElementById('repo-container');
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            data.forEach((repo, index) => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('repo-card');

                const languageColor = {
                    'JavaScript': '#f1e05a',
                    'HTML': '#e34c26',
                    'CSS': '#ff69b4'
                }[repo.language] || '#c9d1d9';

                repoCard.innerHTML = `
                    <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">
                        <h3>
                            ${repo.name}
                            <span class="repo-status ${repo.archived ? 'archive' : ''}">
                                ${repo.archived ? 'Public archive' : 'Public'}
                            </span>
                        </h3>
                        <p class="repo-description">${repo.description || 'No description available'}</p>
                        <div class="repo-info">
                            <span class="repo-language">
                                <span class="language-color" style="background-color: ${languageColor};"></span>
                                ${repo.language || 'N/A'}
                            </span>
                            <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                            <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
                        </div>
                    </a>`;

                repoCard.style.animationDelay = `${Math.floor(index / 2) * 200}ms`;

                // Append the repository card to the container
                container.appendChild(repoCard);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            container.innerHTML = '<p>Error loading repositories.</p>';
        });
});