import AboutMe from "@/components/dom/AboutMe"
import Navbar from "@/components/dom/NavigationBar"
export default function Page() {
    return (
        <div className="flex flex-col gap-20 overflow-x-scroll no-scrollbar">
            <>
                <Navbar />
            </>
            <AboutMe />
        </div>
    )
}