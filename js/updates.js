document.addEventListener('DOMContentLoaded', () => {
    const repoOwner = 'om3ga6400';
    const repoName = 'om3ga6400.github.io';
    const container = document.getElementById('updates-container');

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`)
        .then(response => response.json())
        .then(commits => {
            if (Array.isArray(commits)) {
                renderCommits(commits); // Render the commits
            } else {
                container.innerHTML = '<p>No commits found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching commits:', error);
            container.innerHTML = '<p>Error loading commits.</p>';
        });

    function renderCommits(commits) {
        commits.forEach(commit => {
            fetch(commit.url)
                .then(response => response.json())
                .then(commitDetails => {
                    const commitElement = document.createElement('a');
                    commitElement.href = commit.html_url;
                    commitElement.target = '_blank';
                    commitElement.classList.add('commit-entry');

                    const commitDate = new Date(commitDetails.commit.author.date).toLocaleString();
                    const [commitTitle, ...commitDescriptionLines] = commitDetails.commit.message.split('\n');
                    const commitDescription = commitDescriptionLines.join('\n') || 'No description available';
                    const stats = commitDetails.stats || { additions: 0, deletions: 0, total: 0 };
                    const changedFiles = commitDetails.files ? commitDetails.files.length : 0;
                    const deploymentStatus = commitDetails.commit.message.toLowerCase().includes('deploy failed') ? 'failed' : 'passed';

                    commitElement.innerHTML = `
                        <div class="commit-content">
                            <p class="commit-status ${deploymentStatus}">
                                ${deploymentStatus === 'passed' ? 'Deployment Passed' : 'Deployment Failed'}
                            </p>
                            <div class="commit-details">
                                <h3>${commitTitle}</h3>
                                <p class="commit-description">${commitDescription}</p>
                                <p class="commit-date">${commitDate}</p>
                            </div>
                            <div class="commit-stats">
                                <span><i class="fa-solid fa-plus"></i> ${stats.additions} added</span>
                                <span><i class="fa-solid fa-minus"></i> ${stats.deletions} deleted</span>
                                <span><i class="fa-solid fa-code-branch"></i> ${stats.total} changed</span>
                                <span><i class="fa-solid fa-file-alt"></i> ${changedFiles} changed files</span>
                            </div>
                        </div>
                    `;

                    container.appendChild(commitElement);
                })
                .catch(error => {
                    console.error('Error fetching commit details:', error);
                });
        });
    }
});