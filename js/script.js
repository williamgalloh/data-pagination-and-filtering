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

   if(total_pages > 0) {
      // Highlight first pagination link
      document.querySelector('.link-list li:first-child button').classList.add("active");
   }
}


/**
 * addSearchbar
 * 
 * Adds searchbar element to the page
 */
function addSearchbar() {
   const search_bar = `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>`;

    let header = document.querySelector('header');
    header.insertAdjacentHTML('beforeend', search_bar);
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearchbar();

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

let search = (e) => {
   let search_query = document.querySelector('.student-search input').value.toLowerCase();

   let new_list = [];
   for (let i = 0; i < data.length; i++) {
      let student = data[i];

      // Check if student name matches search query
      if(student.name.first.toLowerCase().includes(search_query) || student.name.last.toLowerCase().includes(search_query)) {
         new_list.push(student);
      }
   }

   // CAN BE IMPROVED ****
   if(new_list.length > 0) {
      if(document.querySelector('.no-results')) {
         document.querySelector('.no-results').remove();
      }
   } else {
      document.querySelector('header').insertAdjacentHTML('afterend', '<h3 class="no-results">No results found</h3>');
   }

   showPage(new_list, 1);
   addPagination(new_list);
};

// Handle search functionality
document.querySelector('.student-search input').addEventListener('keyup', search);
document.querySelector('.student-search button').addEventListener('click', search);
