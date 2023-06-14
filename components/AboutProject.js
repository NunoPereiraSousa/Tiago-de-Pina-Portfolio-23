import React, { useState } from "react";
import { PrismicRichText, PrismicLink } from "@prismicio/react";
import Figure from "./Elements/Figure";

export default function AboutProject({ name, year, image, description, url }) {
  const [active, setActive] = useState(false);

  const onClickHandler = (e) => {
    setActive(!active);
  };

  return (
    <div className="content_project">
      <div className="content_project_headlines" onClick={onClickHandler}>
        <div className="content_project_name">
          <PrismicRichText
            field={name}
            components={{
              heading1: ({ children }) => (
                <p className="paragraph">{children}</p>
              ),
            }}
          />
        </div>
        <div className="content_project_actions">
          <div className="content_project_year">
            <PrismicRichText field={year} />
          </div>
          {active ? (
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.50156 1.19226L0.190145 8.8658C0.0680893 8.99384 0 9.16394 0 9.34083C0 9.51773 0.0680893 9.68783 0.190145 9.81587L0.198407 9.82413C0.257577 9.88642 0.3288 9.93601 0.407743 9.9699C0.486685 10.0038 0.571697 10.0213 0.657608 10.0213C0.743518 10.0213 0.82853 10.0038 0.907472 9.9699C0.986415 9.93601 1.05764 9.88642 1.11681 9.82413L8.00138 2.59809L14.8832 9.82413C14.9424 9.88642 15.0136 9.93601 15.0925 9.9699C15.1715 10.0038 15.2565 10.0213 15.3424 10.0213C15.4283 10.0213 15.5133 10.0038 15.5923 9.9699C15.6712 9.93601 15.7424 9.88642 15.8016 9.82413L15.8099 9.81587C15.9319 9.68783 16 9.51773 16 9.34083C16 9.16394 15.9319 8.99384 15.8099 8.8658L8.49844 1.19226C8.43415 1.12477 8.35681 1.07105 8.27113 1.03434C8.18545 0.997628 8.09321 0.978699 8 0.978699C7.90679 0.978699 7.81455 0.997628 7.72887 1.03434C7.64319 1.07105 7.56585 1.12477 7.50156 1.19226Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.49844 9.80771L15.8099 2.13417C15.9319 2.00613 16 1.83603 16 1.65914C16 1.48224 15.9319 1.31214 15.8099 1.1841L15.8016 1.17584C15.7424 1.11355 15.6712 1.06396 15.5923 1.03007C15.5133 0.996176 15.4283 0.9787 15.3424 0.9787C15.2565 0.9787 15.1715 0.996176 15.0925 1.03007C15.0136 1.06396 14.9424 1.11355 14.8832 1.17584L7.99862 8.40188L1.11681 1.17584C1.05764 1.11355 0.986415 1.06396 0.907473 1.03007C0.82853 0.996176 0.743518 0.9787 0.657608 0.9787C0.571698 0.9787 0.486686 0.996176 0.407743 1.03007C0.328801 1.06396 0.257579 1.11355 0.198408 1.17584L0.190145 1.1841C0.0680894 1.31214 0 1.48224 0 1.65914C0 1.83603 0.0680894 2.00613 0.190145 2.13417L7.50156 9.80771C7.56586 9.8752 7.64319 9.92892 7.72887 9.96563C7.81455 10.0023 7.90679 10.0213 8 10.0213C8.09321 10.0213 8.18545 10.0023 8.27113 9.96563C8.35681 9.92892 8.43415 9.8752 8.49844 9.80771Z"
                fill="white"
              />
            </svg>
          )}
        </div>
      </div>

      {active && (
        <div className="content_project_dropdown">
          <Figure
            figureClassName="content_project_figure"
            imageClassName="content_project_image"
            image={image}
          />
          <div className="content_project_description">
            <PrismicRichText field={description} />
          </div>
          <PrismicLink className="content_project_url" href={url}>
            See live ↗
          </PrismicLink>
        </div>
      )}
      <span className="content_project_line"></span>
    </div>
  );
}
