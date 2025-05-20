

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

function loadProjects(jsonPath, containerId, isHome = false) {
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load JSON");
      return response.json();
    })
    .then(data => {
      const container = document.getElementById(containerId);
      data.forEach(project => {
        const tags = project.tags.map(tag => `<span>${tag}</span>`).join(" ");
        const html = isHome
          ? `
              <div class="project-item">
                <div>
                  <a href="${project.link}" target="blank">
                    <h3>${project.title}</h3>
                    <p>${project.shortDescription || project.description}</p>
                  </a>
                </div>
                <div class="tags">${tags}</div>
              </div>
            `
          : `
              <div class="project">
                <div class="project-image-container">
                  <img class="project-image" src="${project.image}" alt="${project.alt || project.title}">
                </div>
                <div class="project-details">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  <div class="tags">${tags}</div>
                  <a href="${project.link}" class="view-code" target='_blank'>${project.buttonText}</a>
                </div>
              </div>
            `;
        container.innerHTML += html;
      });
    
      // Waiting for images to load, then average colour is calculated
      const images = container.querySelectorAll(".project-image");
      images.forEach(img => {
        img.addEventListener("load", () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let r = 0, g = 0, b = 0, count = 0;

          // Sampling every 10th pixel to save performance
          for (let i = 0; i < imageData.length; i += 40) {
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
            count++;
          }

          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          const avgColor = `rgb(${r}, ${g}, ${b})`;
          img.parentElement.style.backgroundColor = avgColor;
        });
      });
    })
    .catch(error => console.error("Error loading project data:", error));
}

// Usage
loadProjects('projects.json', 'project-container');       // full project page
loadProjects('projects.json', 'project-grid', true);      // home page


