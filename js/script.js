/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

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
   console.log(paginationButtons);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   let count = 1;
   for (let i = 0; i < paginationButtons; i++) {
      const li = `
         <li>
            <button type="button">${count}</button>
         </li>
      `;
      count += 1;
      linkList.insertAdjacentHTML('beforeend', li);
      linkList.firstElementChild.querySelector('button').className = 'active';
   }
   linkList.addEventListener('click', (e) => {
      const pageButtons = document.querySelectorAll('button[type="button"]');
      for (let i = 0; i < pageButtons.length; i++) {
         pageButtons[i].classList.remove('active');
         if (e.target === pageButtons[i]) {
            pageButtons[i].classList.add('active');
            const pageNum = pageButtons[i].textContent;
            showPage(list, pageNum);
         }
      }
   });
}

// Call functions

showPage(data, 1);
addPagination(data);