import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'; // Importing CSS module

// const ProgressBar = () => {
//   const [progress, setProgress] = useState(0);

//   const increaseProgress = () => {
//     setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
//   };

//   useEffect(() => {
//     let intervalId = setInterval(increaseProgress, 100);
//     return () => {
//         clearInterval(intervalId);
//     }
//   }, []);

//   return (
//     <div>
//       <div className={styles.progressBarContainer}>
//         <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
//       </div>
//       <button onClick={increaseProgress}>Increase Progress</button>
//     </div>
//   );
// };

// export default ProgressBar;

export default function ProgressBar(){
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    function updateProgress(){
        setProgress(prev => {
            if(prev + 1 > 100){
                clearInterval(intervalRef.current);
            }
            return Math.min(prev + 1, 100);
        })
    }

    useEffect(() => {
        intervalRef.current = setInterval(updateProgress, 100);
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [])

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{width: `${progress}%`}}></div>
            {/* <div>RSHUL</div> */}
        </div>
    )
}
