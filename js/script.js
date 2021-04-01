/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

"use strict";

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if ( i >= startIndex && i < endIndex) {
         const studentProfile = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML('beforeend', studentProfile);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const paginationButtons = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   let count = 1;
   for (let i = 0; i < paginationButtons; i++) {
      const li = `
         <li>
            <button class="js-page-button" type="button">${count}</button>
         </li>
      `;
      count += 1;
      linkList.insertAdjacentHTML('beforeend', li);
   }
   linkList.querySelector('li button').classList.add('active');
   linkList.addEventListener('click', (e) => {
      const pageButtons = document.querySelectorAll('.js-page-button');
      for (let i = 0; i < pageButtons.length; i++) {
         if (e.target === pageButtons[i]) {
            pageButtons[i].classList.add('active');
            const pageNum = pageButtons[i].textContent;
            showPage(list, pageNum);
         } else {
            pageButtons[i].classList.remove('active');
         }
      }
   });
}

// Call functions

showPage(data, 1);
addPagination(data);

/*
Create Search Form
*/

const studentsH2 = document.querySelector('.header h2');
const searchForm = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button">
         <img src="img/icn-search.svg" alt="Search icon">
      </button>
   </label>
`;
studentsH2.insertAdjacentHTML('afterend', searchForm);

/*
* `searchFilter` function. As user types in search input student cards that match are displayed 
*/

const input = document.getElementById('search');

function searchFilter(list) {
   const searchName = input.value.toUpperCase();
   console.log(searchName);
   const studentArray = [];
   for ( let i = 0; i < list.length; i++) {
      const studentFirst = list[i].name.first;
      const studentLast = list[i].name.last;
      const studentName = studentFirst.toUpperCase() + " " + studentLast.toUpperCase();
      if (studentName.indexOf(searchName) > -1) {
         studentArray.push(list[i]);
      } 
   }
   showPage(studentArray, 1);
   addPagination(studentArray);
}

// addEventListeners for search functionality

input.addEventListener('keyup', () => searchFilter(data));
input.addEventListener('click', (e) => {
   searchFilter(data);
   e.preventDefault();
});
