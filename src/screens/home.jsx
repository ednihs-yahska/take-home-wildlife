import React, { useEffect, useState } from "react";
import CSVParser from "../utilities/csv-parser"
import ObjectZipper from "../utilities/object-zipper"
import Flashcard from "../components/flashcard"

const dataEndpoint = "http://take-home-wildlife.s3-website-us-west-2.amazonaws.com/data.csv"

const Home = ()=>{
    const [wildlifeData, setWildlifeData] = useState([])

    useEffect(()=>{
        fetch(dataEndpoint).then(response=>response.text()).then((textResult)=>{
            const csvParser = new CSVParser()
            const dataLines = csvParser.parse(textResult)
            const objectZipper = new ObjectZipper()
            const data = objectZipper.zip(dataLines[0], dataLines.slice(1))
            setWildlifeData(data)

        })
    },[])
    return (
        <div className="main-page">
            <div className="stack m-2 relative flex">
            {
                [...Array(12).keys()].map((_, k)=>{
                    const styles = { 
                        transform: `translateY(${-k*2}px)` 
                    };
                    return <Flashcard card={null} styles={styles} classes={``} key={k}/>
                })
            }
            <Flashcard card={null} classes={`relative`}/>
            </div>
        </div>
    )
}

export default Home