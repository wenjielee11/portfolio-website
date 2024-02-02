
import Card from "./Card";

function AboutMe(){
    let title = "You can call me Lee."
    let description = "I am a junior in CS"
    
    return(
        <div className="min-h-screen bg-left-top bg-repeat" style={{ backgroundImage: "url('/spacebackground.png')"}}>
            <div className = "h-full w-full flex flex-col md:flex-row gap-10 px-1">
                <Card title={title} description={description}/>
            </div>
        </div>

    )
} 
export default AboutMe;