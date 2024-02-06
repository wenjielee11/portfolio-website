
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
        return (
            <div className='welcome-container' style={{ pointerEvents: 'none', position: 'absolute', padding: '0 1em', top: '50%', left: '0%', transform: 'translateY(-60%)', maxWidth: '50%' }}>
                <h1 style={{
                    margin: 0,
                    marginTop: '2em',
                    fontSize: 'calc(2em + 3vw)',
                    fontWeight: 200,
                    letterSpacing: '0.05em',
                    background: 'linear-gradient(50deg, #c850c0, #ffcc70)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Hello, <br></br>
                    I&apos;m Wen Jie.</h1>
                <div className="text-lg text-gray-400 my-5 max-w-[50%]">
                    I am a Computer Science major in the University of Wisconsin-Madison, and a full-stack Software Engineer with experience in Website and Software Development. I enjoy all things space!
                </div>
                <button className="py-2 pointer-events-auto button-primary text-center text-white rounded-lg max-w-[200px]" onClick={handleClick}>
                    Learn More!
                </button>
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
                    Zoom in and out for a better view!
                </div>
            )}
        </>

    );
}
export default LandingOverlay;