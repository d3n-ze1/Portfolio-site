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