import React, { useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module

const accordionItems = [
    { title: "Section 1", content: "Content for section 1." },
    { title: "Section 2", content: "Content for section 2." },
    { title: "Section 3", content: "Content for section 3." }
  ];


const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className={styles.accordionItem}>
      <div
        className={`${styles.accordionTitle} ${isOpen ? styles.accordionTitleActive : ""}`}
        onClick={onToggle}
      >
        <h3>{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

const Accordion = ({ items = accordionItems }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={activeIndex === index}
          onToggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
