const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  notesList.textContent = "";

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  } else {
    filteredNotes.forEach((note) => {
      const li = document.createElement("li");
      li.className = `note-card category-${note.category.toLowerCase()}`;

      const text = document.createElement("p");
      text.textContent = note.text;

      const category = document.createElement("span");
      category.className = "category-label";
      category.textContent = note.category;

      const date = document.createElement("p");
      date.className = "date";
      date.textContent = note.createdAt;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.dataset.id = note.id;

      li.appendChild(text);
      li.appendChild(category);
      li.appendChild(date);
      li.appendChild(deleteButton);

      notesList.appendChild(li);
    });
  }

  updateCount();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  saveNotes();
  render();

  noteInput.value = "";
});

notesList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const id = Number(event.target.dataset.id);

    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    render();
  }
});

searchInput.addEventListener("input", render);

render();
