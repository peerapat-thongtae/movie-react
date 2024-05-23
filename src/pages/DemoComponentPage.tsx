import SocialButton from '@/components/common/SocialButton'

const DemoComponentPage = () => {
  return (
    <div className="grid grid-cols-4 gap-2 px-12">
      <div>
        <label>Social Button</label>
        <div className="flex gap-2">
          <SocialButton provider="instagram" label="testig" showDetail={true} />
          <SocialButton provider="imdb" label="tt00121314" showDetail={true} />
          <SocialButton provider="facebook" label="Anya Taylor Joy" showDetail={true} />
          <SocialButton provider="tmdb" label="tt00121314" showDetail={false} />
        </div>
      </div>

      <div>
        <label>MediaCard</label>
        {/* <Loading /> */}
        <div className="grid grid-cols-2 gap-4">
          {/* <MediaCard imagePath="https://www.themoviedb.org/t/p/w1280/pKaA8VvfkNfEMUPMiiuL5qSPQYy.jpg" title="test" />
          <MediaCard imagePath="https://www.themoviedb.org/t/p/w1280/pKaA8VvfkNfEMUPMiiuL5qSPQYy.jpg" title="test" />
          <MediaCard imagePath="https://www.themoviedb.org/t/p/w1280/pKaA8VvfkNfEMUPMiiuL5qSPQYy.jpg" title="test" />
          <MediaCard imagePath="https://www.themoviedb.org/t/p/w1280/pKaA8VvfkNfEMUPMiiuL5qSPQYy.jpg" title="test" /> */}
        </div>
      </div>
    </div>
  )
}

export default DemoComponentPage
