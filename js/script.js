/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Initialize variable that will determine how many students to show per page
let items_per_page = 9;

// Initialize variable that will hold current student data, this will help when filtering and modifying the items_per_page setting
let current_list = data;

// Initialize variable that will keep track of the page we are currently on
let current_page = 1;

function getStartIndex() {
   return (current_page * items_per_page) - items_per_page;
}

function getEndIndex() {
   return current_page * items_per_page;
}

/**
 * showPage
 * 
 * Determines the current start/end page index and displays the relevant items on the page
 *
 * @param {Object[]} list - An array of studen objects
 * @param {integer} page - Page index to show 
 */
function showPage(list, page) {
   let start_index = getStartIndex();
   let end_index = getEndIndex();

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

      addResultDetails();
   }
}

/**
 * addResultDetails
 * 
 * Adds a summary of the results displayed on the page
 */
function addResultDetails() {
   let start_index = getStartIndex();
   let end_index = getEndIndex();
   let total_entries = current_list.length;

   // Calculate real end index is last page contains less items than items_per_page value
   if(end_index > total_entries) {
      let last_page_count = total_entries % items_per_page;
      end_index = (start_index + last_page_count);
   }

   let details = `<p class="result-details">Showing ${start_index + 1} to ${end_index} of ${total_entries} entries<p>`;
   document.querySelector('.result-details').innerHTML = details;
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

/**
 * addPerPageDropdown
 * 
 * Adds dropdown element to the page which changes the number of items displayed per page
 */
function addPerPageDropdown() {
   const dropdown = `<div class="students-per-page">
      <label>Show per page:</label>
      <select id="items-per-page">
         <option value="9" selected="selected">9</option>
         <option value="18">18</option>
         <option value="27">27</option>
         <option value="36">36</option>
      </select>
   </div>`;

   let header = document.querySelector('header');
   header.insertAdjacentHTML('beforeend', dropdown);
}

/**
 * search
 * 
 * Handles search functionality
 *
 * @param {Object Event} e - Event object passed by event listener
 */
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

   current_list = new_list;

   // CAN BE IMPROVED ****
   if(current_list.length > 0) {
      if(document.querySelector('.no-results')) {
         document.querySelector('.no-results').remove();
      }
   } else {
      if(!document.querySelector('.no-results')) {
         document.querySelector('header').insertAdjacentHTML('afterend', '<h3 class="no-results">No results found</h3>');
      }
   }

   showPage(current_list, 1);
   addPagination(current_list);
};

// Call functions
showPage(current_list, 1);
addPagination(current_list);
addPerPageDropdown();
addSearchbar();

// Handle page navigation
document.querySelector('.link-list').addEventListener('click', (e) => {
   if(e.target.tagName === "BUTTON") {
      let button = e.target;
      let new_page_index = button.dataset.page;
      current_page = new_page_index;
      showPage(current_list, new_page_index);
      addResultDetails();
      document.querySelector('.link-list button.active').classList.remove("active");
      button.classList.add('active');
   }
});

document.querySelector('.student-search input').addEventListener('keyup', search);
document.querySelector('.student-search button').addEventListener('click', search);

// Handle items per page functionality
document.querySelector('#items-per-page').addEventListener('change', (e) => {
   let dropdown = e.target;
   items_per_page = dropdown.value;
   current_page = 1;
   showPage(current_list, 1);
   addPagination(current_list);
});
