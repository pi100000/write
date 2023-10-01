import React from "react";

interface ContentCardProps {
  item: {
    id: number;
    title: string;
    content: string;
    tags: string[];
  };
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  return (
    <div className="content content-card" key={item.id}>
      <h2>{item.title}</h2>
      <p>{item.content}</p>
      <div className="tags">
        {item.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ContentCard;
