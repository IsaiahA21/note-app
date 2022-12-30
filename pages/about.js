import React from "react";
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const About = () => {
  return (
    <main className={styles.main}>
      <Container className="ui teal message" textAlign='center'>
        <Header as='h2' color='violet'>About page</Header>
        <p>Following along with Jason Rivera's tutorial on YouTube</p>
        <p>
          Click for the <a  href="https://www.youtube.com/watch?v=tt9hws5JGRc" className="vid"> video </a>
 
        </p>
        
        <a href="/" className="vid">HomePage</a>
        </Container >
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