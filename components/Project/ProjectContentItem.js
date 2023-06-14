import { PrismicRichText } from "@prismicio/react";
import ProjectContentListItem from "./ProjectContentListItem";

export default function ProjectContentItem({ headline, description }) {
  return (
    <div className="project_content">
      {description.length === 1 ? (
        <>
          <div className="project_content_headline">
            <PrismicRichText field={headline} />
          </div>
          <div className="project_content_description">
            <PrismicRichText field={description} />
          </div>
        </>
      ) : (
        <>
          <div className="project_content_headline">
            <PrismicRichText field={headline} />
          </div>
          <ul className="project_content_list">
            {description.map((d, i) => (
              <ProjectContentListItem key={i} text={d.text} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
