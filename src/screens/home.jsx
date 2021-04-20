import React, { useEffect, useState } from "react";

const dataEndpoint = "http://take-home-wildlife.s3-website-us-west-2.amazonaws.com/data.csv"

const Home = ()=>{
    useEffect(()=>{
        fetch(dataEndpoint).then(response=>response.text()).then((textResult)=>{
            console.log(textResult)
        })
    },[])
    return (
        <div className="main-page">
            Flashcard App
        </div>
    )
}

export default Home