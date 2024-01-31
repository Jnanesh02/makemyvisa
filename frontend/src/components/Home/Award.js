import React,{useRef,useEffect} from 'react';
import award from "../../assets/images/awards.png"
const Award = () => {
    const count1Ref = useRef(null);
    const count2Ref = useRef(null);
    const count3Ref = useRef(null);
  
    const counterAnim = (target, start = 0, end, duration = 1000) => {
      let startTimestamp = null;
  
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  
        // Check if the target is still mounted before updating the text
        if (target) {
          target.innerText = Math.floor(progress * (end - start) + start);
        }
  
        if (progress < 1 && target) {
          window.requestAnimationFrame(step);
        }
      };
  
      window.requestAnimationFrame(step);
    };
  
    useEffect(() => {
      counterAnim(count1Ref.current, 10, 1500, 10000);
      counterAnim(count2Ref.current, 10, 1650, 10000);
      counterAnim(count3Ref.current, 10, 1800, 20000);
  
    //   // Cleanup function to cancel animation if the component is unmounted
    //   return () => {
    //     // You can add cleanup logic here if needed
    //   };
    }, [count1Ref, count2Ref, count3Ref]);
  
    return (
      <section className="awards-section">
        <div className="container">
          <div className="row">
            {/* Award Card 1 */}
            <div className="col-lg-4 awards-clo col-md-6 col-sm-6">
              <div className="card-body">
                <img src={award} alt="Award 1" />
                <div className="awards-counts-section">
                  <p className="text-awards">Average time to apply <br /> on makemyvisa </p>
                  <h3 ref={count1Ref} className="display-4 center text-awards">
                  <span className="visually-hidden">Count 1: </span>
                </h3>
                </div>
              </div>
            </div>
  
            {/* Award Card 2 */}
            <div className="col-lg-4 awards-clo col-md-6 col-sm-6">
              <div className="card-body">
                <img src={award} alt="Award 2" />
                <div className="awards-counts-section">
                  <p className="text-awards">Average time to apply <br /> on makemyvisa </p>
                  <h3 ref={count2Ref} className="display-4 center text-awards">
                  <span className="visually-hidden">Count 1: </span>
                </h3>
                </div>
              </div>
            </div>
  
            {/* Award Card 3 */}
            <div className="col-lg-4 awards-clo col-md-6 col-sm-6">
              <div className="card-body">
                <img src={award} alt="Award 3" />
                <div className="awards-counts-section">
                  <p className="text-awards">Average time to apply <br /> on makemyvisa </p>
                  <h3 ref={count3Ref} className="display-4 text-center text-awards">
                  <span className="visually-hidden">Count 1: </span>
                </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Award;
