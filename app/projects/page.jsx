import ProjectSkills from "@/components/dom/ProjectsSkills"
import Navbar from "@/components/dom/NavigationBar"
export default function Page() {
    return (
        <div className="overflow-x-scroll no-scrollbar">
            <>
                <Navbar />
            </>
            <ProjectSkills/>
        </div>
    )
}