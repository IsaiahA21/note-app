import React from "react";
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Box } from '@chakra-ui/react'

export const About = () => {
  return (
    <main className={styles.main}>
      <Box bg='grey' borderRadius='md' w='100%' p={4} color='white'>
        <h1>about page</h1>
        <p>following along with Jason Rivera tutorial on youtube</p>
        <p>
          Click for the <a  href="https://www.youtube.com/watch?v=tt9hws5JGRc" className="vid"> video </a>
 
        </p>
        
        <a href="/" className="vid">HomePage</a>
        </Box >
        <style jsx>{`
        .container {
          margin: 50px;
        }
        .vid {
          color: blue;
        }

      `}</style>
      
    </main>
  )
}

export default About;