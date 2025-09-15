import React from 'react'
import Card from './Card'
import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'

function AboutMe() {
  const title = 'About Me'
  const imageStyle = 'max-w-[30%] max-h-[20%] rounded-full'

  // Load markdown file from /content folder
  const filePath = path.join(process.cwd(), 'public', 'about-me.md')
  const aboutMeText = fs.readFileSync(filePath, 'utf-8')

  return (
    <div className='min-h-screen bg-left-top bg-repeat' style={{ backgroundImage: "url('/spacebackground.png')" }}>
      <div style={{ paddingTop: '15vh', justifyItems: 'center' }}>
        <div className='px-10 h-full w-full flex justify-center items-center text-lg text-color-white'>
          <Card
            title={title}
            description={
              <ReactMarkdown
                components={{
                  p: (props) => <p className='mb-5' {...props} />,
                  h1: (props) => <h1 className='mt-8 mb-4 text-3xl font-bold' {...props} />,
                  h2: (props) => <h2 className='mt-6 mb-3 text-2xl font-semibold' {...props} />,
                }}
              >
                {aboutMeText}
              </ReactMarkdown>
            }
            src={'/Biophoto.jpg'}
            imageStyle={imageStyle}
          />
        </div>
      </div>
    </div>
  )
}

export default AboutMe
