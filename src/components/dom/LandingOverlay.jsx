
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
            const resumeUrl = '/WenJieLee_Resume.pdf';
            window.open(resumeUrl, '_blank');
        };
        return (
            <div className='welcome-container' style={{ pointerEvents: 'none', position: 'absolute', marginTop: '15vh', marginLeft: '3vw', top: '0%', left: '0%' }}>
                <h1 style={{
                    fontSize: 'calc(1em + 4vw)',
                    fontWeight: 200,
                    letterSpacing: '0.05em',
                    background: 'linear-gradient(170deg, #c850c0, #ffcc70)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Hello, <br></br>
                    I&apos;m Wen Jie.</h1>
                <div className="text-lg text-white md:text-gray-400 my-4 md:max-w-[30%]">
                    I am a Computer Science student in the University of Wisconsin-Madison, and a full-stack Software Engineer with experience in Website and Software Development. Welcome to my Space!
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
                    top: 0,
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