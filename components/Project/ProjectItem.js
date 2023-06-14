import { PrismicRichText, PrismicLink, PrismicText } from "@prismicio/react";
import ProjectContentItem from "./ProjectContentItem";
import Figure from "../Elements/Figure";

export default function ProjectItem({
  name,
  banner,
  content,
  url,
  totalAndIndex,
}) {
  return (
    <div className="project_item">
      <div className="project_box">
        <div className="project_left">
          <div className="project_headlines">
            <PrismicLink className="project_headline" href={url.url}>
              <PrismicText field={name} />
            </PrismicLink>

            <p className="paragraph">
              &#91;&nbsp;{`${totalAndIndex.index} - ${totalAndIndex.total}`}
              &nbsp;&#93;
            </p>
          </div>

          <Figure
            figureClassName="project_item_figure"
            imageClassName="project_item_image"
            image={banner}
          />
        </div>
      </div>

      <div className="project_box">
        <div className="project_right">
          {content.map((item, index) => (
            <ProjectContentItem
              key={index}
              headline={item.project_headline}
              description={item.project_description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
