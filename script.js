

document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("nav-links").classList.toggle("show");
});

function filterProjects() {
    let searchValue = document.getElementById("search-bar").value.toLowerCase();
    let projects = document.querySelectorAll(".project");

    projects.forEach(project => {
        let tagElements = project.querySelectorAll(".tags span");
        let tags = Array.from(tagElements).map(tag => tag.textContent.toLowerCase());

        if (tags.some(tag => tag.includes(searchValue)) || searchValue === "") {
            project.style.display = "flex";
        } else {
            project.style.display = "none";
        }
    });
}

fetch('projects.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('project-container');
    data.forEach(project => {
      const tags = project.tags.map(tag => `<span>${tag}</span>`).join(" ");
      const projectHTML = `
        <div class="project">

          <div class="project-image">
            <img src="${project.image}" alt="${project.alt || project.title}">
          </div>

          <div class="project-details">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">
              ${tags}
            </div>
            <a href="${project.link}" class="view-code">View Code</a>
          </div>
          
        </div>
      `;
      container.innerHTML += projectHTML;
    });
  })
  .catch(error => {
    console.error("Error loading project data:", error);
  });


  // on home page
  fetch('projects.json')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load JSON");
    return response.json();
  })
  .then(data => {
    const homeContainer = document.getElementById('project-grid');
    data.forEach(project => {
      const tags = project.tags.map(tag => `<span>${tag}</span>`).join(" ");
      const homeProjectHTML = `
        <div class="project-item">
          <div>
            <a href="${project.link}" target="blank">
              <h3>${project.title}</h3>
              <p>${project.shortDescription || project.description}</p>
            </a>
          </div>
          <div class="tags">
              ${tags}
          </div>          
        </div>
      `;
      homeContainer.innerHTML += homeProjectHTML;
    });
  })
  .catch(error => {
    console.error("Error loading project data:", error);
  });
