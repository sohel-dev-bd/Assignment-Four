
let jobs = [
  { id: 1, position: "Mobile First Corp", company: "React Native Developer", location: "Remote", type: "Full-time", salary: "$120k", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "all" },
  { id: 2, position: "WebFlow Agency", company: "React Engineer", location: "USA", type: "Contract", salary: "$100k", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "all" },
  { id: 3, position: "DataViz Solutions", company: "Data Visualization Specialist", location: "Canada", type: "Full-time", salary: "$110k", description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.", status: "all" },
  { id: 4, position: "CloudFirst Inc",company: "Backend Developer", location: "Remote", type: "Full-time", salary: "$115k", description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status: "all" },
  { id: 5, position: "Innovation Labs",company: "UI/UX Engineer", location: "Europe", type: "Remote", salary: "$95k", description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.", status: "all" },
  { id: 6, position: "MegaCorp Solutions", company: "JavaScript Developer", location: "USA", type: "Full-time", salary: "$125k", description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.", status: "all" },
  { id: 7, position: "StartupXYZ", company: "Full Stack Engineer", location: "Remote", type: "Contract", salary: "$105k", description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.", status: "all" },
  { id: 8, position: "TechCorp Industries", company: "Senior Frontend Developer", location: "USA", type: "Full-time", salary: "$130k", description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.", status: "all" }
];

let jobList = document.getElementById("jobList");
let emptyState = document.getElementById("emptyState");

let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let tabCount = document.getElementById("tabCount");

let currentTab = "all";

function renderJobs() {
  jobList.innerHTML = "";

  let showJobs = [];

  if (currentTab === "all") {
    showJobs = jobs;
  } else {
    for (let number = 0; number < jobs.length; number++) {
      if (jobs[number].status === currentTab) {
        showJobs.push(jobs[number]);
      }
    }
  }

  tabCount.innerText = showJobs.length + " Jobs";

  if (showJobs.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  for (let numbers = 0; numbers < showJobs.length; numbers++) {
    let job = showJobs[numbers];

    let div = document.createElement("div");
    div.className = "bg-white p-5 rounded-xl shadow";

    div.innerHTML = `
      <h3 class="font-semibold text-xl py-2 text-[#002C5C]">${job.position}</h3>
      <p class="text-sm text-gray-500 py-2">${job.company} • ${job.location}</p>
      <p class="text-sm text-gray-500 py-2">${job.type} • ${job.salary}</p>
      <p class="mt-2 text-gray-700 py-2">${job.description}</p>

    <div class="flex gap-2 mt-4 justify-between ">
    
      <div class="grid grid-cols-2 gap-4">
        <button class="interview w-[100px] bg-green-500 text-white px-3 py-1 rounded">Interview</button>
        <button class="rejected w-[100px] bg-red-500 text-white px-3 py-1 rounded">Rejected</button>
        </div>

        <div class="">
        <button class="delete bg-gray-600 rounded-full border border-gray-600 text-white px-3 py-2 rounded"><i class="fa-solid  fa-trash"></i></button>
      </div>

      </div>
    `;

    let interviewBtn = div.querySelector(".interview");
    let rejectedBtn = div.querySelector(".rejected");
    let deleteBtn = div.querySelector(".delete");

    interviewBtn.onclick = function () {
      changeStatus(job.id, "interview");
    };

    rejectedBtn.onclick = function () {
      changeStatus(job.id, "rejected");
    };

    deleteBtn.onclick = function () {
      deleteJob(job.id);
    };

    jobList.appendChild(div);
  }

  updateDashboard();
}

function changeStatus(id, newStatus) {
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id === id) {
      jobs[i].status = newStatus;
    }
  }

  currentTab = newStatus;
  setActiveTab(newStatus);
  renderJobs();
}

function deleteJob(id) {
  let temp = [];

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id !== id) {
      temp.push(jobs[i]);
    }
  }

  jobs = temp;
  renderJobs();
}

function updateDashboard() {
  totalCount.innerText = jobs.length;

  let interview = 0;
  let rejected = 0;

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].status === "interview") interview++;
    if (jobs[i].status === "rejected") rejected++;
  }

  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;
}

function setActiveTab(tab) {
  let tabs = document.querySelectorAll(".tab");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("bg-indigo-600", "text-white");
    tabs[i].classList.add("bg-gray-200");
  }

  let active = document.querySelector(`[data-tab="${tab}"]`);
  active.classList.remove("bg-gray-200");
  active.classList.add("bg-indigo-600", "text-white");

  currentTab = tab;
  renderJobs();
}

let tabs = document.querySelectorAll(".tab");

for (let i = 0; i < tabs.length; i++) {
  tabs[i].onclick = function () {
    setActiveTab(tabs[i].dataset.tab);
  };
}

renderJobs();
