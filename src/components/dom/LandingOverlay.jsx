
import { useState, useEffect } from 'react'

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

        return (
            <div className='welcome-container' style={{ pointerEvents: 'none', position: 'absolute', padding: '0 1em', top: '50%', left: '0%', transform: 'translateY(-60%)', maxWidth: '50%' }}>
                <h1 style={{
                    margin: 0,
                    fontSize: 'calc(2em + 3vw)',
                    fontWeight: 200,
                    letterSpacing: '0.05em',
                    background: 'linear-gradient(30deg, #c850c0, #ffcc70)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Hello, <br></br>
                    I&apos;m Wen Jie.</h1>
                <div className="text-lg text-gray-400 my-5 max-width-40%">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam recusandae, consequuntur molestiae doloribus deleniti architecto, odit, perspiciatis libero sint omnis ex! Totam sed sit blanditiis esse cumque maxime adipisci sunt.
                </div>
                <button className="py-2 pointer-events-auto button-primary text-center text-white rounded-lg max-w-[200px]">
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