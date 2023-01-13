import {useState} from 'react'
import {Formik, Form, Field} from 'formik'
import './header.css'
import './content.css'
import './article.css'

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({photos})
  return (
    <div>
      <header>
        <Formik
          initialValues={{search:''}}
          onSubmit={async values =>{
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID 7ZwL7OuvIjN0Wc4n7d5DELbkLFF2ys3rXeiBqJVuDFo'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <label className='headerLabel'>Buscador de imagenes: </label>
            <Field name='search' placeholder='Search'/>
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={()=> open(photo.links.html)}>
              <img src={photo.urls.regular} alt='img'/>
              <p>{(!photo.description ? '' : photo.description + ' - ') + photo.alt_description}</p>
            </article>)}
        </div>
      </div>
    </div>
  );
}

export default App;
