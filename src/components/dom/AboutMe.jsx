
import Card from "./Card";
import React from 'react'
function AboutMe() {
    let title = "About Me"
    let descriptionText = `My name is Wen Jie/Lee and I am currently a senior studying in the University of Wisconsin-Madison. My major is Computer Science.

    I speak 3 languages: English, Mandarin and Bahasa Malaysia. I am originally from Malaysia, but I currently reside in localhost:Wisconsin-Madison.

    Raised in Malaysia, I consider myself fortunate to have been able to support and uplift those in need from a young age. My high school years were marked by significant involvement in volunteer work and leadership roles within various organizations. 
    
    As the Divisional Chairman of St. John's Ambulance Malaysia, I led healthcare-focused initiatives, including charity drives, donation campaigns, first-aid classes, and footdrill, among others. In my role as Vice President of the IT club, I organized Java programming lessons, which further honed my programming skills through extensive practice in extracurricular activities.
    
    Growing up, my parents were pretty hands-off on how I should live: To live for the others, or to live for your own. At the age of 15, they told me that they had taught me everything there is, and that I should search for my own faith, for my own life and for my own system. 
    
    It was honestly a difficult conversation for me. A universe of opportunities so broad, so vast and vague. You could at one point be the boy who became everything, and at the same time be the boy who embraced nothingness. And so I tried, I worked and I failed. I threw myself into extracurriculars hoping I could find my answer.
    
    I built my division, my organization, I made tons of friends that I cherished to my heart--
    
    But it wasn't enough. 

    I needed a platform with a much larger influence. Medicine wasn't for me : There were only so many people I could save with a pair of hands. There were also only so many people I could reach out to within a classroom. After my journey of trial and error in a multitude of fields, I decided on Computer Science.

    With a flick of a finger, software deployed could instantly reach out to millions of people at once. My journey to fulfillment could have a substantial meaning. 

    Coming to Wisconsin-madison, I have been looking for an employer that could fulfill my aspirations. It isn't just a platform to fork a bitstream of endless money, but something for me to find purpose in.
    
    To me, at the end of the line, life has so much more meaning when you are leaving behind a legacy. Be it a child, your loved ones, your posessions, your world and your universe.

    And thus here I am, hoping to impress you with everything that I have made and am making in my programming journey. 

    To live is to die, and before death, is to leave a mark. 

    But enough about me. What about you, who are you to become?

    Lee.
    `
    const imageStyle = "max-w-[30%] max-h-[20%] rounded-full"
    const description = descriptionText.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
    return (
        <div className="min-h-screen bg-left-top bg-repeat" style={{ backgroundImage: "url('/spacebackground.png')" }}>
            <div style={{ paddingTop: "15vh", justifyItems: "center" }}>
                <div className=" px-10 h-full w-full flex justify-center items-center text-lg">
                    <Card title={title} description={description} src={"/Biophoto.jpg"} imageStyle={imageStyle} />
                </div>
            </div>
        </div>

    )
}
export default AboutMe;