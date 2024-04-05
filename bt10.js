document.addEventListener("DOMContentLoaded", function () {
  var projectTable = document.getElementById("projectTable");
  let projectList = localStorage.getItem("storage")
    ? JSON.parse(localStorage.getItem("storage"))
    : [];
  // Hàm hiển thị danh sách project
  function displayProjects(projects) {
    projectTable.innerHTML = `<tr>
      <th>STT.</th>
      <th>Họ Tên</th>
      <th>giới tính</th>
      <th>ngày sinh</th>
      <th>địa chỉ</th>
      <th>Action</th>
    </tr>`;

    projects.forEach(function (project, index) {
      let row = projectTable.insertRow(-1);
      // Thêm cột số thứ tự
      let indexCell = row.insertCell(0);
      indexCell.textContent = index + 1;
      // Thêm các cột thông tin khác
      row.insertCell(1).innerText = project.projectName;
      row.insertCell(2).innerText = project.imgUrl;
      row.insertCell(3).innerText = project.link;
      row.insertCell(4).innerText = project.tags.join(", ");
      // Thêm cột thao tác (Action)
      let actionCell = row.insertCell(5);

      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteProject(project.id);
      });
      let updateButton = document.createElement("button");
      updateButton.innerText = "Update";
      updateButton.addEventListener("click", function () {
        updateProject(project.id);
      });
      actionCell.appendChild(deleteButton);
      actionCell.appendChild(updateButton);
    });
  }

  // Hàm xóa project
  function deleteProject(id) {
    projects = projects.filter((project) => project.id !== id);
    localStorage.setItem("storage", JSON.stringify(projects));
    displayProjects(projectList);
  }

  // Hàm cập nhật project
  function updateProject(id) {
    let projectToUpdate = projects.find((project) => project.id === id);

    if (projectToUpdate) {
      projectToUpdate.projectName = prompt("Enter the new project name");
      projectToUpdate.imgUrl = prompt("Enter the new image URL");
      projectToUpdate.link = prompt("Enter the new link");
      projectToUpdate.tags = prompt("Enter the new tags").split(",");

      localStorage.setItem("storage", JSON.stringify(projects));
      displayProjects(projectList);
    } else {
      console.error("Project not found with ID: " + id);
    }
  }

  // Hàm validate ngày sinh không được lớn hơn ngày hiện tại
  function validateDOB(dob) {
    let inputDate = new Date(dob);
    let currentDate = new Date();
    return inputDate <= currentDate;
  }

  // Sự kiện khi click vào nút "Thêm mới"
  document
    .getElementById("newProject")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let projectName = document.getElementById("project_name").value;
      let imgUrl = document.getElementById("img_url").value;
      let dobString = document.getElementById("link").value;
      let tags = document.getElementById("tag").value.split(",");
      let dob = new Date(dobString);
      // Validate họ tên không để trống
      if (projectName.trim() === "") {
        alert("Họ tên không được để trống");
        return;
      }

      // Validate ngày sinh không được lớn hơn ngày hiện tại
      if (!validateDOB(dob)) {
        alert("Ngày sinh không được lớn hơn ngày hiện tại");
        return;
      }
      let formattedDOB = formatDate(dob);
      var newProject = {
        id: projects.length + 1,
        projectName: projectName,
        imgUrl: imgUrl,
        link: formattedDOB,
        tags: tags,
      };

      projects.push(newProject);

      localStorage.setItem("storage", JSON.stringify(projects));

      displayProjects(projectList);
    });

  displayProjects(projectList);
  document.getElementById("searchInput").addEventListener("keyup", function () {
    searchProjects();
  });

  function searchProjects() {
    let searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    let filteredProjects = projectList.filter(function (project) {
      return project.projectName.toLowerCase().includes(searchInput);
    });
    console.log(filteredProjects);
    if (filteredProjects.length > 0) {
      displayProjects(filteredProjects);
    } else {
      projectTable.innerHTML = `<tr><td colspan="6">Không có kết quả tìm kiếm</td></tr>`;
    }
  }
});
function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${day}/${month}/${year}`;
}
