/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Initialize constant that will determine how many students to show per page
const items_per_page = 9;

/**
 * showPage
 * 
 * Determines the current start/end page index and displays the relevant items on the page
 *
 * @param {Object[]} list - An array of studen objects
 * @param {integer} page - Page index to show 
 */
function showPage(list, page) {
   let start_index = (page * items_per_page) - items_per_page;
   let end_index = page * items_per_page;

   let student_list = document.querySelector(".student-list");

   let list_items = '';
   for (let i = 0; i < list.length; i++) {
      if(i >= start_index && i < end_index) {
         let student = list[i];
         list_items += `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
               <h3>${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
            </div>
         </li>`;
      }
   }

   student_list.innerHTML = list_items;
}


/**
 * addPagination
 * 
 * Adds pagination elements to the page
 *
 * @param {Object[]} list - An array of studen objects
 */
function addPagination(list) {
   const total_pages = Math.ceil(list.length / items_per_page);

   let link_list = document.querySelector('.link-list');

   let list_items = '';
   for (let i = 1; i <= total_pages; i++) {
      list_items += `<li>
         <button type="button" data-page="${i}">${i}</button>
      </li>`;
   }

   link_list.innerHTML = list_items;
}


// Call functions
showPage(data, 1);
addPagination(data);

// Highlight first pagination link
document.querySelector('.link-list li:first-child button').classList.add("active");

// Handle page navigation
document.querySelector('.link-list').addEventListener('click', (e) => {
   if(e.target.tagName === "BUTTON") {
      let button = e.target;
      let new_page_index = button.dataset.page;
      showPage(data, new_page_index);
      document.querySelector('.link-list button.active').classList.remove("active");
      button.classList.add('active');
   }
});
