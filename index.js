let jobs = [];
let currentPage = 1;
const jobsPerPage = 10;

async function fetchJobs() {
    document.getElementById('loading').style.display = 'block'; // Show loading animation
    const response = await fetch('https://remotive.com/api/remote-jobs');
    const data = await response.json();
    jobs = data.jobs;
    currentPage = 1;
    displayJobs();
    document.getElementById('loading').style.display = 'none'; // Hide loading animation
    document.getElementById('pagination').style.display = 'block';
}

function displayJobs() {
    const jobsContainer = document.getElementById('jobsContainer');
    jobsContainer.innerHTML = ''; // Clear previous jobs

    const start = (currentPage - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    const paginatedJobs = jobs.slice(start, end);

    paginatedJobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job';

        jobElement.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company_name}</p>
            <p><strong>Location:</strong> ${job.candidate_required_location}</p>
            <p><strong>Category:</strong> ${job.category}</p>
            <p><strong>Job Type:</strong> ${job.job_type}</p>
            <a href="job-details.html?id=${job.id}" target="_blank">View Job</a>
        `;

        jobsContainer.appendChild(jobElement);
    });

    document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${Math.ceil(jobs.length / jobsPerPage)}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayJobs();
    }
}

function nextPage() {
    if (currentPage * jobsPerPage < jobs.length) {
        currentPage++;
        displayJobs();
    }
}

// Fetch jobs when the page loads
window.onload = fetchJobs;