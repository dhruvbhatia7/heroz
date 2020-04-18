import Head from 'next/head'
import {firestore} from '../components/Firebase/firebase.js';
import { useState, useEffect } from 'react';
import HeartButton from '../components/heartButton.js';


export default function Home() {
  
  const [heroz, setHeroz] = useState([]);
  
  const [hearts, setHearts] = useState(0);



  const funcCallback = (count, heroObj) => {
    setHearts(() => count);
    console.log('printing heroObj in funcCallback');
    console.log(heroObj);
    firestore.collection('heroz').doc(heroObj.id).update({
      hearts: count
    });
  }

  useEffect(() => {
    firestore.collection('heroz').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //setHeroz([...heroz, doc.data().name]);
          setHeroz(heroz => [...heroz, doc.data()]);
          console.log(doc.data());
          //setHeroz(heroz => heroz.concat(doc));
          //setHeroz(heroz.push(doc.data().name));
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
    });
  }, []);
  
  

  return (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous"
      />

    </Head>

    
    <main>

      <h1 className="title">
        We salute 🙏 you heroz 🦸
      </h1>

      <div className="encloser">

      {Object.keys(heroz).map((hero, id) => (
        <div key={id} className="row">
          <div className="col">
            <div className="card">
              <div className="name">🦸 <span className="field">{heroz[hero].name}</span></div>
              <div className="superpower">🔧 <span className="field">{heroz[hero].superpower}</span></div>
              <div className="location">📍 <span className="field">{heroz[hero].location}</span></div>
              <div className="div-btn">
                <span>
                  <a href={heroz[hero].link} className="btn btn-primary btn-sm">Read More >></a>
                </span>
                <span>
                  <HeartButton parentCallback={funcCallback} heroObject={heroz[hero]} className="hrt">{hearts}</HeartButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </main>

    <footer>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        line-height: 1.15;
        font-size: 2rem;
        margin-bottom: 4%;
      }

      .title,
      .description {
        text-align: center;
      }

      .name {
        font-size: 1.1rem;
        font-weight: 600;
      }

      .location {
        font-size: 0.9rem;
      }

      .superpower {
        font-size: 0.9rem;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      .btn {
        color: #fff;
        width: 60%;
        margin-right: 6%;
      }

      .div-btn {
        margin-top: 8%;
      }

      .hrt {
        padding-top: 4%;
        padding-bottom: 4%;
      }

      .button {
        padding-top: 4%;
        padding-bottom: 4%;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 800px;
        margin-top: 3rem;
      }


      .field {
        margin-left: 2%;
      }


      .row {
        display: inline-flex;
        margin: 2% 4%;
      }

      .card {
        flex-basis: 45%;
        padding: 1rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 6px;
        transition: color 0.15s ease, border-color 0.15s ease;
        width: 120%;
        font-size: 1rem;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)
}
