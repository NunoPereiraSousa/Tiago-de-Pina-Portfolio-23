import AboutProject from "@/components/AboutProject";
import Links from "@/components/Typography/Links";
import { Paragraph } from "@/components/Typography/Paragraph";
import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import { Router, useRouter } from "next/router";
import Figure from "@/components/Elements/Figure";

/**
 * @typedef {import("@prismicio/client").Content.ResumeSlice} ResumeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ResumeSlice>} ResumeProps
 * @param {ResumeProps}
 */
const Resume = ({ slice }) => {
  let router = useRouter();

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`content ${slice.variation}`}
      data-router={router.query.uid === "credits" ? "credits" : ""}
      data-scroll-section
    >
      <div className="content_wrapper">
        <div className="content_grid">
          {slice.variation === "withEmailAndLocation" && (
            <div>
              {slice?.items.map((item, index) => (
                <div className="content_description" key={index}>
                  <Links isEmail={true} text={item.social_media.data.name} />
                </div>
              ))}
            </div>
          )}
          {slice.variation === "withSocialMedia" && (
            <div>
              <div className="content_headline">
                <PrismicRichText field={slice?.primary.headline} />
              </div>
              <div className="content_socials_wrapper">
                {slice?.items.map((item, index) => (
                  <div className="content_description" key={index}>
                    <Links
                      isEmail={false}
                      url={item.social_media.data.link.url}
                      text={item.social_media.data.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {slice.variation === "default" && (
            <>
              {slice?.items.map((item, index) => (
                <div className="content_item" key={index}>
                  <div className="content_headline">
                    <PrismicRichText field={item.headline} />
                  </div>
                  {item.description.length === 1 ? (
                    <div className="content_description">
                      <PrismicRichText field={item.description} />
                    </div>
                  ) : (
                    <ul className="content_list">
                      {item.description.map((desc, i) => (
                        <li key={i} className="content_list_item">
                          <Paragraph children={desc.text} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}
          {slice?.variation === "projects" && (
            <div className="content_projects content_item">
              {slice?.items.map((item, index) => (
                <AboutProject
                  key={index}
                  name={item.project.data.project_name}
                  year={item.project.data.project_year}
                  image={item.project.data.project_image}
                  description={item.project.data.project_description}
                  url={item.project.data.project_url}
                />
              ))}
            </div>
          )}
        </div>

        {slice.variation === "default" && (
          <Figure
            figureClassName="content_figure"
            imageClassName="content_image"
            image={slice?.primary.image}
          />
        )}
      </div>
    </section>
  );
};

export default Resume;
