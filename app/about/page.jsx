import AboutMe from "@/components/dom/AboutMe"
import Navbar from "@/components/dom/NavigationBar"
export default function Page() {
    return (
        <div className="overflow-x-scroll no-scrollbar">
            <>
                <Navbar />
            </>
            <AboutMe />
        </div>
    )
}