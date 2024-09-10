document.addEventListener('DOMContentLoaded', () => {
  const modalContainer = document.getElementById('book-modal')
  const openModalButton = document.querySelector('.open-modal-btn')
  const closeModalButtons = document.querySelectorAll(
    '[data-bs-dismiss="modal"]'
  )
  const addBookButton = document.getElementById('add-book')
  const bookForm = document.getElementById('book-form')
  const booksContainer = document.getElementById('books-container')
  const bookTitle = document.getElementById('book-title')
  const bookAuthor = document.getElementById('book-author')
  const bookPages = document.getElementById('book-pages')
  const bookRead = document.getElementById('book-read')
  const bookTitleFeedback = document.getElementById('book-title-feedback')
  const bookAuthorFeedback = document.getElementById('book-author-feedback')
  const bookPagesFeedback = document.getElementById('book-pages-feedback')

  class Book {
    constructor (title, author, pages, read) {
      this.title = title
      this.author = author
      this.pages = pages
      this.read = read
    }

    renderBookCard (index) {
      const bookCard = document.createElement('div')
      bookCard.classList.add('book-card')
      bookCard.setAttribute('data-index', index)
      bookCard.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3>${this.title}</h3>
          </div>
          <div class="card-body">
            <ul class="book-data">
              <li>Author: ${this.author}</li>
              <li>Pages: ${this.pages}</li>
              <li>${this.read}</li>
            </ul>
          </div>
          <div class="card-footer">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary delete-btn" data-index="${index}" title="Delete">Delete</button>
              <button type="button" class="btn btn-sm btn-outline-secondary toggle-read-btn" data-index="${index}" title="Read Status">${
        this.read === 'Read' ? 'Mark as Unread' : 'Mark as Read'
      }</button>
            </div>
          </div>
        </div>`
      return bookCard
    }
  }

  const books = [
    new Book('Orientalism', 'Edward Said', 368, 'Read'),
    new Book('Manufacturing Consent', 'Noam Chomsky', 480, 'Read')
  ]

  function renderBooks () {
    booksContainer.innerHTML = ''
    books.forEach((book, index) => {
      booksContainer.appendChild(book.renderBookCard(index))
    })
  }

  function addBook () {
    const newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      parseInt(bookPages.value),
      bookRead.checked ? 'Read' : 'Unread'
    )
    books.push(newBook)
    renderBooks()
    modalContainer.style.display = 'none'
    resetForm()
  }

  function resetForm () {
    bookForm.reset()
    bookTitleFeedback.textContent = ''
    bookAuthorFeedback.textContent = ''
    bookPagesFeedback.textContent = ''
  }

  function validateForm () {
    let isValid = true

    if (bookTitle.value.trim() === '') {
      bookTitleFeedback.textContent = '*Title is required.'
      bookTitleFeedback.style.color = 'red'
      isValid = false
    } else {
      bookTitleFeedback.textContent = ''
    }

    if (bookAuthor.value.trim() === '') {
      bookAuthorFeedback.textContent = '*Author is required.'
      bookAuthorFeedback.style.color = 'red'
      isValid = false
    } else {
      bookAuthorFeedback.textContent = ''
    }

    if (
      bookPages.value.trim() === '' ||
      isNaN(bookPages.value) ||
      bookPages.value <= 0
    ) {
      bookPagesFeedback.textContent = '*Please enter a valid number of pages.'
      bookPagesFeedback.style.color = 'red'
      isValid = false
    } else {
      bookPagesFeedback.textContent = ''
    }

    return isValid
  }

  booksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index')
      books.splice(index, 1)
      renderBooks()
    }

    if (e.target.classList.contains('toggle-read-btn')) {
      const index = e.target.getAttribute('data-index')
      books[index].read = books[index].read === 'Read' ? 'Unread' : 'Read'
      renderBooks()
    }
  })

  renderBooks()

  openModalButton.addEventListener('click', () => {
    modalContainer.style.display = 'flex'
    modalContainer.focus()
  })

  closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modalContainer.style.display = 'none'
      resetForm()
    })
  })

  addBookButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (validateForm()) {
      addBook()
    }
  })

  window.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      modalContainer.style.display = 'none'
      resetForm()
    }
  })
})
