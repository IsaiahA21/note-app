import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
// import { chakra, Button, ButtonGroup , Card, CardHeader, CardBody, CardFooter, Grid, GridItem } from '@chakra-ui/react'
// import { Container } from '@chakra-ui/layout'
import {Button, Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

function Home({notes}: any) {
  return (
    <>
      <main className={styles.main}>
        <div className='note-container'>
          <h1>Notes</h1>
            <Card.Group>
          {notes?.map((note: any) => {
            // Using an if check
            if (!notes) {
              console.log('\u001b[' + 31 + 'm' +"notes is null"+ '\u001b[0m');
            }
            return(
                <Card key={note._id}>
                  <Card.Content>
                    <Card.Header>
                    <Link href={`/${note._id}`} legacyBehavior>
                      <a>{note.title}</a>
                    </Link>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/${note._id}`}>
                      <Button inverted color='blue'>View</Button>
                    </Link>
                     <Link href={`/${note._id}/edit`}>{/*route to the edit page} */}
                      <Button inverted color='yellow'>Edit</Button>
                    </Link>
                  </Card.Content>
                </Card>
            )
        })}
        </Card.Group>
        </div>
      </main>
    </>
  )
}
//getInitialProps is a next js function that allows us to run some code before the acutal
// componment gets rendered to the page
Home.getInitialProps = async () => {
  //make a api request to fetch the data we need for the index page
  // then we are going to return the data to Home function as a prop(aka a paramater)

  const res = await fetch('http://localhost:3001/api/notes'); // api will send back an object

  // extract data
  const {data} = await res.json();

  return {notes: data} // return an object with the property allNotes
}
export default Home;
