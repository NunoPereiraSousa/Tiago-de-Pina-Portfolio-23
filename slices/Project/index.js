import ProjectItem from "@/components/Project/ProjectItem";

/**
 * @typedef {import("@prismicio/client").Content.ProjectSlice} ProjectSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ProjectSlice>} ProjectProps
 * @param {ProjectProps}
 */
const Project = ({ slice }) => {
  const getProjectIndex = (i) => {
    return {
      total:
        slice.items.length < 10 ? `0${slice.items.length}` : slice.items.length,
      index: i < 10 ? `0${i}` : i,
    };
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="projects"
      data-scroll-section
    >
      <div className="projects_wrapper">
        <div className="projects_grid">
          {slice?.items.map((item, index) => (
            <ProjectItem
              key={index}
              name={item.project.data.project_name}
              content={item.project.data.content}
              url={item.project.data.project_url}
              banner={item.project.data.project_banner}
              totalAndIndex={getProjectIndex(index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
