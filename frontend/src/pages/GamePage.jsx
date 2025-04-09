import { useState } from 'react'
import WikiViewer from '../components/WikiViewer'
import ProgressBar from '../components/ProgressBar'

const GamePage = () => {
  const [articleTitle, setArticleTitle] = useState('Elon_Musk')
  const [progress, setProgress] = useState(0) // We'll compute this later

  return (
    <div>
      <h2>Target: Ancient_Rome</h2>
      <ProgressBar progress={progress} />
      <WikiViewer title={articleTitle} />
    </div>
  )
}

export default GamePage
