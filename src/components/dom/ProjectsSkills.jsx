import Card from "./Card";

export default function ProjectsSkills() {
    let text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sint asperiores similique doloribus, suscipit libero, hic quia aut, minus odit incidunt iure nemo vero corporis natus architecto. Nobis, consequuntur nam!
`
    return (
        <div className="min-h-screen bg-left-top bg-repeat  " style={{
            backgroundImage: "url('/projectstile.jpg')", paddingTop: "15vh"
        }}>
            <h1 className="flex flex-col items-center justify-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                My Projects
            </h1>
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-4 gap-10 px-10 py-5">
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
                <Card src={"/icons/android-icon-192x192.png"} title={"Test"} description={text} />
            </div>
        </div>)
}