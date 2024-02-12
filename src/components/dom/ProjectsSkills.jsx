import Card from "./Card";
import { Backend_skill, Frontend_skill, Projects } from "@/helpers/info.js";
export default function ProjectsSkills() {
    function SkillImage({ src, width, height, index }) {
        return (
            <img
                key={index}
                src={src}
                width={width}
                height={height}
                alt='skill image'
            />
        )
    }
    let text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sint asperiores similique doloribus, suscipit libero, hic quia aut, minus odit incidunt iure nemo vero corporis natus architecto. Nobis, consequuntur nam!
`

    return (
        <div className="min-h-screen bg-left-top bg-repeat  " style={{
            backgroundImage: "url('/projectstile.jpg')", paddingTop: "15vh"
        }}>
            <h1 className="flex flex-col items-center justify-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                My Skills
            </h1>
            <section
                id="skills"
                className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-10"
                style={{ transform: "scale(0.9)" }}
            >

                <div className="flex flex-row justify-center flex-wrap mt-4 gap-5 items-center">
                    {Frontend_skill.map((image, index) => (
                        <SkillImage
                            key={index}
                            src={image.Image}
                            width={image.width}
                            height={image.height}
                            index={index}
                        />
                    ))}
                </div>
                <div className="flex flex-row justify-center items-center flex-wrap mt-4 gap-5 items-center">
                    {Backend_skill.map((image, index) => (
                        <SkillImage
                            key={index}
                            src={image.Image}
                            width={image.width}
                            height={image.height}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            <h1 className="flex flex-col items-center justify-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                My Projects
            </h1>
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-5">
                {Projects.map((project, index) => (
                    <Card key={index} src={project.image} title={project.name} description={project.description} link={project.link} />
                ))}
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
            </div>
        </div>)
}