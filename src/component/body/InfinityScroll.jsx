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

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setLoading(entry.isIntersecting);
    });
    for (let i = 0; i < start + 40; i++) {
      newItems.push(data[i]);
    }

    observer.observe(loadingRef.current);
    setItems(newItems);

    setTimeout(() => {
      setLoadAnimate(false);
    }, 1000);

    return () => {};
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
