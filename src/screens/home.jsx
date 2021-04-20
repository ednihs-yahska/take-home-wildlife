import React, { useEffect, useState } from "react";
import CSVParser from "../utilities/csv-parser"

const dataEndpoint = "http://take-home-wildlife.s3-website-us-west-2.amazonaws.com/data.csv"

const Home = ()=>{
    useEffect(()=>{
        fetch(dataEndpoint).then(response=>response.text()).then((textResult)=>{
            const csvParser = CSVParser()
            const dataLines = csvParser.parse(textResult)
            
        })
    },[])
    return (
        <div className="main-page">
            Flashcard App
        </div>
    )
}

export default Home