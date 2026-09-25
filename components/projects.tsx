import { projects } from "@/lib/data";
import { IndexList } from "@/components/scenes/index-list";
import { ProjectScene } from "@/components/scenes/project-scene";

export function Projects() {
  return (
    <>
      <IndexList />
      {projects.map((p, i) => (
        <ProjectScene key={p.slug} project={p} index={i} />
      ))}
    </>
  );
}
