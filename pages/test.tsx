import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { inspect } from "util";

class Gallery extends React.Component {
  render() {
    const clicked = function (i: number, t: any) {
      window.alert(inspect(t));
    };
    return (
      <div className="relative">
        <h2 className="absolute top-1 left-1 z-50 bg-gold p-1 border border-black">
          My Photo Gallery
        </h2>
        <Carousel
          autoPlay
          infiniteLoop
          interval={2000}
          width="400px"
          dynamicHeight={false}
          onClickItem={clicked}
        >
          <div>
            <img
              src="https://media.istockphoto.com/photos/concept-picture-id1154231467"
              alt=""
            />
            <p className="legend">My Photo 1</p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
              alt=""
            />
            <p className="legend">My Photo 2</p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1655745653127-4d6837baf958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
            <p className="legend">My Photo 3</p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1516527653392-602455dd9cf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
              alt=""
            />
            <p className="legend">My Photo 4</p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1655365225165-8d727fe3a091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=80"
              alt=""
            />
            <p className="legend">My Photo 5</p>
          </div>
        </Carousel>
      </div>
    );
  }
}
export default Gallery;
