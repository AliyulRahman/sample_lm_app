import React, { useState } from "react";
import "./Home.css";
import { getHomeContent } from "../../models/homeContent";

export default function Home() {
  const data = getHomeContent();
  const [openFAQ, setOpenFAQ] = useState(null); // Track which FAQ is open

  const toggleFAQ = (idx) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  if (!data) return <p>No content available.</p>;

  return (
    <div className="home-page">
      {/* Introduction */}
      <section className="section intro-section">
        <div className="intro-content">
          <div className="intro-text">
            <h2>{data.introduction.header}</h2>
            <p>{data.introduction.description}</p>
          </div>
          {data.introduction.image && (
            <div className="intro-image">
              <img src={data.introduction.image} alt="Intro" />
            </div>
          )}
        </div>
      </section>

      {/* Know Us Better */}
      <section className="section know-us">
        <h2>{data.knowUsBetter.header}</h2>
        <p>{data.knowUsBetter.description}</p>
        <div className="card-list">
          {data.knowUsBetter.list.map((item, idx) => (
            <div key={idx} className="info-card">
              <h4>{item.header}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section team">
        <h2>{data.team.header}</h2>
        <p>{data.team.description}</p>
        <div className="card-list">
          {data.team.members.map((member, idx) => (
            <div key={idx} className="team-card">
              {member.image && <img src={member.image} alt={member.name} />}
              <h4>{member.name}</h4>
              <p>{member.designation}</p>
              <p>{member.intro}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Authors */}
      <section className="section authors">
        <h2>{data.authors.title}</h2>
        <div className="card-list">
          {data.authors.list.map((author, idx) => (
            <div key={idx} className="author-card">
              {author.image && <img src={author.image} alt={author.name} />}
              <h4>{author.name}</h4>
              <p>{author.intro}</p>
              <ul>
                {author.books?.map((book, j) => (
                  <li key={j}>
                    <a href={book.link} target="_blank" rel="noopener noreferrer">{book.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Frequent Questions */}
      <section className="section faq">
        <h2>{data.questions.title}</h2>
        <p>{data.questions.description}</p>
        <div className="faq-list">
          {data.questions.list.map((q, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFAQ === idx ? "open" : ""}`}
              onClick={() => toggleFAQ(idx)}
            >
              <strong>Q: {q.question}</strong>
              {openFAQ === idx && <p>A: {q.answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
