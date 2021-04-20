import React, { useEffect, useState } from "react";
import CSVParser from "../utilities/csv-parser"
import ObjectZipper from "../utilities/object-zipper"
import Flashcard from "../components/flashcard"

const dataEndpoint = "http://take-home-wildlife.s3-website-us-west-2.amazonaws.com/data.csv"

const Home = ()=>{
    const [wildlifeData, setWildlifeData] = useState([])
    const [isRotatedArr, setRotatedArray] = useState([])
    const [rotationDirectionArr, setRotationDirectionArr] = useState([])
    const [top, setTop] = useState(0)

    useEffect(()=>{
        fetch(dataEndpoint).then(response=>response.text()).then((textResult)=>{
            const csvParser = new CSVParser()
            const dataLines = csvParser.parse(textResult)
            const objectZipper = new ObjectZipper()
            const data = objectZipper.zip(dataLines[0], dataLines.slice(1))
            setWildlifeData(data)
        })
        //TODO: remove magic numbers
        setRotatedArray([...Array(12).keys()].map(()=>Math.floor(Math.random() * 10)))
        setRotationDirectionArr([...Array(12).keys()].map(()=>Math.floor(Math.random() * 10)))
    },[])
    return (
        <div className="main-page">
            <div className="stack m-2 relative flex">
            {
                [...Array(12).keys()].map((_, k)=>{
                    let rotationStyle = `rotateZ(0deg)`
                    const isRotated = isRotatedArr[k]
                    const rotationDirection = rotationDirectionArr[k]
                    if (isRotated < 5) {
                        if(rotationDirection > 5) {
                            rotationStyle = `rotateZ(-2deg)`
                        } else {
                            rotationStyle = `rotateZ(2deg)`
                        }
                    }
                    const styles = { 
                        transform: `translateY(${-k*2}px) ${rotationStyle}` 
                    };
                    return <Flashcard card={null} styles={styles} classes={``} key={k}/>
                })
            }
            <Flashcard card={wildlifeData[top]} classes={`relative`}/>
            </div>
        </div>
    )
}

export default Home