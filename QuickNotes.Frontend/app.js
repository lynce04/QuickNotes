const apiUrl = "https://localhost:7179/api/notes";
let notes = [];
let activeNoteId = null;

async function loadNotes() {
  console.log("loadNotes called");
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    console.log(result);
    notes = result;
    renderList(notes);
    if (notes.length > 0) openNote(activeNoteId || notes[0].id);
  }

  catch (error) {
    console.error(error.message);

  }

}

//changes the notes fron Db to a list that can be showed on the sidebar.
//calls the openNote method to open the selected note on the editor page.
function renderList(noteArray) {

  // Step 1 — find the <ul id="noteList"> element
  const list = document.getElementById("noteList");

  // Step 2 — clear whatever is already in the list
  list.innerHTML = "";

  // Step 3 — update the note counter at the bottom
  document.getElementById("noteCount").innerText = `${noteArray.length} notes`;

  // Step 4 — loop through each note and create a <li> for it
  noteArray.forEach(note => {

    // create a <li> element
    const li = document.createElement("li");

    // give it the right class
    li.className = note.id === activeNoteId ? "note-item active" : "note-item";

    li.onclick = () => openNote(note.id);

    // fill it with the note title and preview
    // use template literals with note.title and note.content
    li.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-preview">${note.content}</div>
        `;

    // add it to the list
    list.appendChild(li);
  });
}

function openNote(id) {
  activeNoteId = id
  const activeNote = notes.find(note => note.id === activeNoteId);

  let date = new Date(activeNote.createdAt);

  date = date.toLocaleString("de-DE", {timeZone:"Europe/Berlin"});


  document.getElementById("editorBody").value = activeNote.content;

  document.getElementById("editorTitle").value = activeNote.title;

  document.getElementById("editorDate").innerText = date;


  renderList(notes);

}

async function newNote() {
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "New Note", content: "" })

  });

  loadNotes();
}

async function saveNote() {
  const Url = `${apiUrl}/${activeNoteId}`;
  const title = document.getElementById("editorTitle").value;
  const content = document.getElementById("editorBody").value;

  await fetch(Url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, id: activeNoteId, content: content })
  }
  );

  loadNotes();
}

async function deleteNote() {
  const Url = `${apiUrl}/${activeNoteId}`;

  await fetch(Url, {
    method: "DELETE"
  }
  );

  activeNoteId = null;
  loadNotes();

}

function filterNote() {
  const searchText = document.getElementById("searchInput").value;

  const filtered = notes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()));

  renderList(filtered);

}

function toggleFunction() {
  var themePanel = document.getElementById("themePanel");
  if (themePanel.style.display === "block") {
    themePanel.style.display = "none";
  } else {
    themePanel.style.display = "block";
  }
}

function changeBgColor(event) {
  const chosenColor = event.target.value;
  document.getElementById("sidebar").style.backgroundColor = chosenColor;
}

function changeBgImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    // e.target.result contains the image as a base64 string
    document.getElementById("sidebar").style.backgroundImage = `url(${e.target.result})`;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function resetTheme(){
  document.getElementById("sidebar").style.backgroundColor = "#f5f5f0";
  document.getElementById("sidebar").style.backgroundImage = "none";
}

function changeFontSize(e) {
    const contentSize = e.target.value;
    const titleSize = parseInt(contentSize) + 5;
    document.body.style.setProperty("--note-font-size", contentSize + "px");
    document.body.style.setProperty("--title-font-size", titleSize + "px");
}

function changeFontFamily(e) {
    document.body.style.setProperty("--note-font-family", e.target.value);
}

const resizer = document.getElementById("resizer");
const sidebar = document.getElementById("sidebar");

let isResizing = false;

resizer.addEventListener("mousedown", function(e) {
    isResizing = true;
});

document.addEventListener("mousemove", function(e) {
    if (!isResizing) return;
    if (window.innerWidth <= 768) return;
    const newWidth = e.clientX;
    if (newWidth > 150 && newWidth < window.innerWidth / 2) {
        sidebar.style.width = newWidth + "px";
    }
});

document.addEventListener("mouseup", function() {
    isResizing = false;
});

window.addEventListener("resize", function() {
    if (window.innerWidth <= 768) {
        sidebar.style.width = "";
    }
});

document.getElementById("fontSizeSlider").addEventListener("input", changeFontSize);
document.getElementById("fontFamilyPicker").addEventListener("change", changeFontFamily);
document.getElementById("colorPicker").addEventListener("input", changeBgColor);
document.getElementById("imagePicker").addEventListener("change", changeBgImage);
document.getElementById("resetBtn").addEventListener("click", resetTheme );

document.getElementById("themeBtn").addEventListener("click", toggleFunction);
document.getElementById("searchInput").addEventListener("input", filterNote);
document.getElementById("saveBtn").addEventListener("click", saveNote);
document.getElementById("deleteBtn").addEventListener("click", deleteNote);
loadNotes();

