import { data } from "../../data";
import { Container } from "../../styled component/Container";
import "./InfinityScroll.css";
import { useEffect, useRef, useState } from "react";
import loadImage from "../../assets/loading.svg";

export const InfinityScroll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState("");
  const [loadAnimate, setLoadAnimate] = useState(false);

  const loadingRef = useRef();

  useEffect(() => {
    let newItems = [...items];
    let start = 0;
    setLoadAnimate(true);

    for (let i = start; i < start + 40; i++) {
      newItems.push(data[i]);
    }
    setItems(newItems);

    // intersection observer
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setLoading(entry.isIntersecting);
    });
    let currentRef = loadingRef.current;
    observer.observe(loadingRef.current);

    // loading animation
    setTimeout(() => {
      setLoadAnimate(false);
    }, 2000);

    return () => {
      observer.disconnect(currentRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading === true && items.length < data.length) {
      let newItems = [...items];
      let start = newItems.length;
      let end = start + 20;

      if (end > data.length) {
        end = data.length;
      }

      for (let i = start; i < end; i++) {
        newItems.push(data[i]);
      }
      setLoadAnimate(true);
      setTimeout(() => {
        setItems(newItems);
        setLoadAnimate(false);
      }, 1000);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <section>
      <div className="infinity-scroll-container">
        {items.map((e) => (
          <Container className="container" key={e}>
            {e}
          </Container>
        ))}
      </div>
      {loadAnimate === true ? (
        <div className="loadingAnimation">
          <img src={loadImage} alt="loading" />
          <h1>Loading...</h1>
        </div>
      ) : null}
      <div className="loadmore" ref={loadingRef}></div>
    </section>
  );
};
