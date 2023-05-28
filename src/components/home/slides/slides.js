import Carousel from 'react-material-ui-carousel'

 const slides = [
    {
        id: 1,
        imageUrl: './img/slide-1.jpg',
        title: 'Find Your Perfect Venue',
        description: 'Discover and Book Event Spaces with Ease',
      },
    {
      id: 2,
      imageUrl: './img/slide-2.jpg',
      title: 'The Ideal Venue Awaits',
      description: 'Browse, Compare, and Reserve Venues Online',
    },
    {
      id: 3,
      imageUrl: './img/slide-3.jpg',
      title: 'Plan Your Next Event',
      description: 'Book Top Venues for Any Occasion',
    },
    
  ];
  
const Slideshow = ()=> {
    return (
      <Carousel indicatorContainerProps={{
        style: {
          zIndex: 1,
          marginTop: "-16px",
          position: "relative"
        }
      }}
    >
      
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="slides">
            <img src={slide.imageUrl} alt={slide.title} /></div>
            <div className="slide-text"> 
            <div className="title">{slide.title}</div>
            <p>{slide.description}</p>
         </div>
          </div>
        ))}
      </Carousel>
    );
  }
  export default Slideshow;