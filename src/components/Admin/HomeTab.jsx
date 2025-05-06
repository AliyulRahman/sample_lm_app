import React, { useState, useEffect } from "react";
import "./HomeTab.css";
import { getHomeContent, saveHomeContent } from "../../models/homeContent";

const emptyData = {
  introduction: { header: "", description: "", image: "" },
  knowUsBetter: {
    header: "",
    description: "",
    list: [],
  },
  team: {
    header: "",
    description: "",
    members: [],
  },
  authors: {
    title: "",
    list: [],
  },
  questions: {
    title: "",
    description: "",
    list: [],
  },
  footer: {
    about: "",
    email: "",
    phone: "",
    insta: "",
    facebook: "",
  },
};

export default function HomeTab() {
  const [formData, setFormData] = useState(emptyData);

  useEffect(() => {
    const saved = getHomeContent();
    if (saved) setFormData(saved);
  }, []);

  const handleInput = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleImage = (section, field, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: reader.result,
        },
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const updateListItem = (section, listKey, index, field, value) => {
    const updated = [...formData[section][listKey]];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [listKey]: updated,
      },
    }));
  };

  const updateNestedListItem = (section, index, subListKey, subIndex, field, value) => {
    const updated = [...formData[section].list];
    updated[index][subListKey][subIndex][field] = value;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], list: updated },
    }));
  };

  const handleAddItem = (section, listKey, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [listKey]: [...prev[section][listKey], newItem],
      },
    }));
  };

  const handleDeleteItem = (section, listKey, index) => {
    const updated = [...formData[section][listKey]];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [listKey]: updated,
      },
    }));
  };

  const handleAuthorImage = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...formData.authors.list];
      updated[index].image = reader.result;
      setFormData((prev) => ({
        ...prev,
        authors: {
          ...prev.authors,
          list: updated,
        },
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleMemberImage = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...formData.team.members];
      updated[index].image = reader.result;
      setFormData((prev) => ({
        ...prev,
        team: {
          ...prev.team,
          members: updated,
        },
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const saveForm = () => {
    saveHomeContent(formData);
    alert("Home content saved to local storage!");
  };

  return (
    <div className="home-tab">
      <h2>Home Tab Editor</h2>

      {/* Introduction */}
      <section>
        <h3>Introduction</h3>
        <input
          type="text"
          placeholder="Header"
          value={formData.introduction.header}
          onChange={(e) => handleInput("introduction", "header", e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.introduction.description}
          onChange={(e) => handleInput("introduction", "description", e.target.value)}
        />
        <input type="file" onChange={(e) => handleImage("introduction", "image", e.target.files[0])} />
        {formData.introduction.image && <img src={formData.introduction.image} alt="Intro" />}
      </section>

      {/* Know Us Better */}
      <section>
        <h3>Know Us Better</h3>
        <input
          type="text"
          placeholder="Header"
          value={formData.knowUsBetter.header}
          onChange={(e) => handleInput("knowUsBetter", "header", e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.knowUsBetter.description}
          onChange={(e) => handleInput("knowUsBetter", "description", e.target.value)}
        />
        {formData.knowUsBetter.list.map((item, i) => (
          <div key={i} className="list-item">
            <input
              type="text"
              placeholder="Header"
              value={item.header}
              onChange={(e) => updateListItem("knowUsBetter", "list", i, "header", e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateListItem("knowUsBetter", "list", i, "description", e.target.value)}
            />
            <button onClick={() => handleDeleteItem("knowUsBetter", "list", i)}>Delete</button>
          </div>
        ))}
        <button onClick={() => handleAddItem("knowUsBetter", "list", { header: "", description: "" })}>
          Add Item
        </button>
      </section>

      {/* Team */}
      <section>
        <h3>Team</h3>
        <input
          type="text"
          placeholder="Header"
          value={formData.team.header}
          onChange={(e) => handleInput("team", "header", e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.team.description}
          onChange={(e) => handleInput("team", "description", e.target.value)}
        />
        {formData.team.members.map((m, i) => (
          <div key={i} className="list-item">
            <input
              type="text"
              placeholder="Name"
              value={m.name}
              onChange={(e) => updateListItem("team", "members", i, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Designation"
              value={m.designation}
              onChange={(e) => updateListItem("team", "members", i, "designation", e.target.value)}
            />
            <input
              type="text"
              placeholder="Intro"
              value={m.intro}
              onChange={(e) => updateListItem("team", "members", i, "intro", e.target.value)}
            />
            <input type="file" onChange={(e) => handleMemberImage(i, e.target.files[0])} />
            {m.image && <img src={m.image} alt="member" />}
            <button onClick={() => handleDeleteItem("team", "members", i)}>Delete</button>
          </div>
        ))}
        <button
          onClick={() =>
            handleAddItem("team", "members", {
              name: "",
              designation: "",
              intro: "",
              image: "",
            })
          }
        >
          Add Member
        </button>
      </section>

      {/* Authors */}
      <section>
        <h3>Authors</h3>
        <input
          type="text"
          placeholder="Title"
          value={formData.authors.title}
          onChange={(e) => handleInput("authors", "title", e.target.value)}
        />
        {formData.authors.list.map((a, i) => (
          <div key={i} className="list-item">
            <input
              type="text"
              placeholder="Name"
              value={a.name}
              onChange={(e) => updateListItem("authors", "list", i, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Introduction"
              value={a.intro}
              onChange={(e) => updateListItem("authors", "list", i, "intro", e.target.value)}
            />
            <input type="file" onChange={(e) => handleAuthorImage(i, e.target.files[0])} />
            {a.image && <img src={a.image} alt="Author" />}
            <h5>Books:</h5>
            {a.books?.map((b, j) => (
              <div key={j} className="nested-list-item">
                <input
                  type="text"
                  placeholder="Book Name"
                  value={b.name}
                  onChange={(e) => updateNestedListItem("authors", i, "books", j, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Book Link"
                  value={b.link}
                  onChange={(e) => updateNestedListItem("authors", i, "books", j, "link", e.target.value)}
                />
                <button
                  onClick={() => {
                    const updatedBooks = [...a.books];
                    updatedBooks.splice(j, 1);
                    const updatedAuthors = [...formData.authors.list];
                    updatedAuthors[i].books = updatedBooks;
                    setFormData((prev) => ({
                      ...prev,
                      authors: { ...prev.authors, list: updatedAuthors },
                    }));
                  }}
                >
                  Delete Book
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const updatedAuthors = [...formData.authors.list];
                updatedAuthors[i].books = [...(updatedAuthors[i].books || []), { name: "", link: "" }];
                setFormData((prev) => ({
                  ...prev,
                  authors: { ...prev.authors, list: updatedAuthors },
                }));
              }}
            >
              Add Book
            </button>
            <button onClick={() => handleDeleteItem("authors", "list", i)}>Delete Author</button>
          </div>
        ))}
        <button onClick={() => handleAddItem("authors", "list", { name: "", intro: "", image: "", books: [] })}>
          Add Author
        </button>
      </section>

      {/* Frequent Questions */}
      <section>
        <h3>Frequent Questions</h3>
        <input
          type="text"
          placeholder="Title"
          value={formData.questions.title}
          onChange={(e) => handleInput("questions", "title", e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.questions.description}
          onChange={(e) => handleInput("questions", "description", e.target.value)}
        />
        {formData.questions.list.map((q, i) => (
          <div key={i} className="list-item">
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) => updateListItem("questions", "list", i, "question", e.target.value)}
            />
            <input
              type="text"
              placeholder="Answer"
              value={q.answer}
              onChange={(e) => updateListItem("questions", "list", i, "answer", e.target.value)}
            />
            <button onClick={() => handleDeleteItem("questions", "list", i)}>Delete</button>
          </div>
        ))}
        <button onClick={() => handleAddItem("questions", "list", { question: "", answer: "" })}>
          Add Question
        </button>
      </section>

      {/* Footer */}
      <section>
        <h3>Footer</h3>
        <input
          type="text"
          placeholder="About Us"
          value={formData.footer.about}
          onChange={(e) => handleInput("footer", "about", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.footer.email}
          onChange={(e) => handleInput("footer", "email", e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.footer.phone}
          onChange={(e) => handleInput("footer", "phone", e.target.value)}
        />
        <input
          type="text"
          placeholder="Instagram Link"
          value={formData.footer.insta}
          onChange={(e) => handleInput("footer", "insta", e.target.value)}
        />
        <input
          type="text"
          placeholder="Facebook Link"
          value={formData.footer.facebook}
          onChange={(e) => handleInput("footer", "facebook", e.target.value)}
        />
      </section>

      <button className="save-button" onClick={saveForm}>Save</button>
    </div>
  );
}
