
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

const LandingOverlay = () => {
    const [showAlert, setShowAlert] = useState(true);
    const [opacity, setOpacity] = useState(0);
    // Automatically hide the alert after 5 seconds
    useEffect(() => {
        // Fade in
        let fadeInTimeout = setTimeout(() => setOpacity(0.8), 100); // Start fading in

        // Fade out
        let fadeOutTimeout = setTimeout(() => {
            setOpacity(0); // Start fading out
            setTimeout(() => setShowAlert(false), 500); // Remove the element after fade-out
        }, 8000); // 5000ms total - 500ms for fade-out

        return () => {
            clearTimeout(fadeInTimeout);
            clearTimeout(fadeOutTimeout);
        };
    }, []);
    const Introduction = () => {
        const router = useRouter();

        const handleClick = () => {
            router.push('/projects');
        };
        const handleResumeDownload = () => {
            const resumeUrl = '/WenJieLee_cResume.pdf';
            window.open(resumeUrl, '_blank');
        };
        return (
            <div className='welcome-container' style={{ pointerEvents: 'none', position: 'absolute', marginTop: '15vh', marginLeft: '3vw', top: '0%', left: '0%' }}>
                <h1 style={{
                    fontSize: 'calc(4vh + 3.5vw)',
                    fontWeight: 330,
                    letterSpacing: '0.05em',
                    background: 'linear-gradient(174deg, #c850c0, #ffcc70)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Hello, <br></br>
                    I&apos;m Wen Jie.</h1>
                <div className=" text-md md:text-lg lg:text-lg text-white md:text-gray-400 my-4 md:max-w-[30%]">
                    I am a Computer Science student in the University of Wisconsin-Madison, an Undergraduate Research Assistant @ <a href='https://peopleandrobots.wisc.edu/' style={{pointerEvents:"auto"}}><u>The People and Robots Lab</u></a>,
                    and a <a href='https://www.linkedin.com/company/embedded-llm/' style={{pointerEvents:"auto"}}><u>Full-Stack Software Engineer</u></a> with experience in Website and Software Development. Welcome to my Space!
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-4 md:max-w-[30%]'>
                    <button className="py-2 pointer-events-auto button-primary text-center text-white md:text-gray-400 hover:text-white rounded-lg max-w-[150px]" onClick={handleClick}>
                        Learn More!
                    </button>
                    <button className="py-2 pointer-events-auto button-primary text-center text-white md:text-gray-400 hover:text-white rounded-lg max-w-[200px]" onClick={handleResumeDownload}>
                        Download Resume
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {<Introduction></Introduction>}
            {showAlert && (
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'black',
                    textAlign: 'center',
                    padding: '10px',
                    opacity: opacity,
                    zIndex: 1000, // to ensure it's above other elements
                    color: "white",
                    transition: 'opacity 500ms ease-in-out'
                }}>
                    Pinch, pan and zoom for a better view!
                </div>
            )}
        </>

    );
}
export default LandingOverlay;