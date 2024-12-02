async function fetchJobDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    if (!jobId) {
        document.getElementById('jobDetailsContainer').innerText = 'Job ID not found.';
        return;
    }

    const response = await fetch('https://remotive.com/api/remote-jobs');
    const data = await response.json();
    const job = data.jobs.find(job => job.id == jobId);

    if (!job) {
        document.getElementById('jobDetailsContainer').innerText = 'Job not found.';
        return;
    }

    const jobDetailsContainer = document.getElementById('jobDetailsContainer');
    jobDetailsContainer.innerHTML = `
        <h2>${job.title}</h2>
        <p><strong>Company:</strong> ${job.company_name}</p>
        <p><strong>Location:</strong> ${job.candidate_required_location}</p>
        <p><strong>Category:</strong> ${job.category}</p>
        <p><strong>Job Type:</strong> ${job.job_type}</p>
        <p><strong>Description:</strong> ${job.description}</p>
        <a href="${job.url}" target="_blank">Apply for this job</a>
    `;
}

// Fetch job details when the page loads
window.onload = fetchJobDetails;