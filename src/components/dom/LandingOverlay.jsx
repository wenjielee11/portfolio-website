
import { useState, useEffect } from 'react'

const LandingOverlay = () =>{
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
        }, 10000); // 5000ms total - 500ms for fade-out

        return () => {
            clearTimeout(fadeInTimeout);
            clearTimeout(fadeOutTimeout);
        };
    }, []);
    const Introduction = () => {

        return (
            <div style={{ pointerEvents: 'none', position: 'absolute', top: '50%', left: '0%', transform: 'translateY(-50%)', maxWidth: '50%'}}>
                <h1 style={{
                    margin: 0,
                    padding: '0 1em',
                    fontSize: '5em',
                    fontWeight: 200,
                    letterSpacing: '0.05em',
                    zIndex: 1000,
                    background: 'linear-gradient(30deg, #c850c0, #ffcc70)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Hello, 
                    I&apos;m Wen Jie.</h1>
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