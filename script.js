const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
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

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  render();

  noteInput.value = "";
});
